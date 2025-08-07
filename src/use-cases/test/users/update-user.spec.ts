import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { updateUserUseCase } from 'use-cases/update-user'
import { ResouceNotFoundError } from 'use-cases/errors/resource-not-found-error'

describe('Update User Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: updateUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new updateUserUseCase(usersRepository)
  })

  it('should be able to update user', async () => {
    // Create initial user
    await usersRepository.create({
      id: "user-1",
      name: "Vítor Guedes",
      email: "teste033@teste01.com",
      role: 'ADMIN',
      password_hash: await hash("123456", 6)
    })

    // Update user
    const updatedData = {
      userId: "user-1",
      role: 'MEMBER' as const,
    }

    const { user } = await sut.update({
      ...updatedData
    })

    // Verify updates
    expect(user.id).toEqual("user-1")

    expect(user.role).toEqual(updatedData.role)

  })

  it('should not authenticate with non-string email', async () => {
    await expect(() =>
      sut.update({
        userId: null as unknown as string,
        role: 'MEMBER' as const,
      })
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })

})
