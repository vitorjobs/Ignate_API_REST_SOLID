
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'
import { InMemoryGymsRepository } from 'repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
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
      latitude: new Decimal(0),
      longitude: new Decimal(0),
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
      userLatitude: 0,
      userLongitude: 0
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should note be able to Check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 18, 0, 0))

    await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: 0,
      userLongitude: 0
    })
    await expect(() => sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: 0,
      userLongitude: 0
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to Check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 18, 0, 0))

    await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: 0,
      userLongitude: 0
    })

    vi.setSystemTime(new Date(2021, 0, 20, 18, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
      userLatitude: 0,
      userLongitude: 0
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
