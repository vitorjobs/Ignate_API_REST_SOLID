import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "repositories/check-ins-repository";
import { GymsRepository } from "repositories/gyms-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberCheckInsError } from "./errors/max-number-of-check-ins-error";

interface CheckInUseCaseRequest {
  userId: string,
  gymId: string,
  userLatitude: number,
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
    // private checkInsRepository: CheckInsRepository
  ) { }

  async execute({
    userId, gymId, userLatitude, userLongitude
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResouceNotFoundError()
    }

    const distante = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distante > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDate) {
      throw new MaxNumberCheckInsError()
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })
    return {
      checkIn,
    }
  }
}
