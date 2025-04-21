
import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryCheckInsRepository } from 'repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'

describe('Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

  })

  it('should be able to Check-in', async () => {
    const { checkIn } = await sut.execute({
      userId: "gym-01",
      gymId: "user-01",
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
