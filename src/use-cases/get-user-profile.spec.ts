
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResouceNotFoundError } from './errors/resource-not-found-error'

describe('Get user Profile Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)

  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: "Vítor Guedes",
      email: "vitor@teste01",
      password_hash: await hash("123456", 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("Vítor Guedes")
  })


  it('should not authenticate with non-string email', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })

})
