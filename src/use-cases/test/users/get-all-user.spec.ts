
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { getAllUserUseCase } from 'use-cases/get-all-user'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'

describe('Get list all Users Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: getAllUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new getAllUserUseCase(usersRepository)

  })

  it('should be able to get list all users', async () => {

    await usersRepository.create({
      name: "Vítor Guedes",
      email: "teste03@teste01.com",
      role: 'ADMIN',

      password_hash: await hash("123456", 6)
    })

    await usersRepository.create({
      name: "Théo Marques",
      email: "teste02@teste01.com",
      role: 'MEMBER',

      password_hash: await hash("123456", 6)
    })

    const { allUsers } = await sut.getAll()
    expect(allUsers).toHaveLength(2)

  })
})
