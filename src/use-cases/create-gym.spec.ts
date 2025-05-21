/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, test, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { CreateGymUseCase } from './create-gym'
import { before } from 'node:test'
import { InMemoryGymsRepository } from 'repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {

    const { gym } = await sut.execute({
      title: "Vítor Guedes",
      description: "teste gym",
      phone: null,
      latitude: -15.813294,
      longitude: -48.1067789
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
