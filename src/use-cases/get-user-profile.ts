import { UsersRepository } from "repositories/users-repository";
import { User } from "@prisma/client";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
  userId: string,
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(
    private UsersRepository: UsersRepository,
  ) { }

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.UsersRepository.findById(userId)

    if (!user) {
      throw new ResouceNotFoundError()
    }

    return { user }
  }
}
