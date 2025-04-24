
import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from 'repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'

describe('Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()

  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to Check-in', async () => {
    const { checkIn } = await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should note be able to Check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 18, 0, 0))

    await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
    })
    await expect(() => sut.execute({
      userId: "gym-01",
      gymId: "user-01",
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to Check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 18, 0, 0))

    await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
    })

    vi.setSystemTime(new Date(2021, 0, 20, 18, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
