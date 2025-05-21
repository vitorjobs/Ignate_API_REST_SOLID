
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryGymsRepository } from 'repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
// let sut: CheckInUseCase
describe('Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'user-01',
      title: "javaScript",
      phone: '',
      description: "",
      latitude: new Decimal(-15.813294),
      longitude: new Decimal(-48.1067789),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to Check-in', async () => {

    const { checkIn } = await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: -15.813294,
      userLongitude: -48.1067789
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should note be able to Check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 18, 0, 0))

    await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: -15.813294,
      userLongitude: -48.1067789
    })
    await expect(() => sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: -15.813294,
      userLongitude: -48.1067789
    })).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should be able to Check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 18, 0, 0))

    await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: -15.813294,
      userLongitude: -48.1067789
    })

    vi.setSystemTime(new Date(2021, 0, 20, 18, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: -15.813294,
      userLongitude: -48.1067789
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to Check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: "javaScript",
      phone: '',
      description: "",
      latitude: new Decimal(-15.8147228),
      longitude: new Decimal(-48.1064949),
    })

    await expect(() =>
      sut.execute({
        userId: "user-02",
        gymId: "gym-02",
        userLatitude: -15.813294,
        userLongitude: -48.1067789
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
