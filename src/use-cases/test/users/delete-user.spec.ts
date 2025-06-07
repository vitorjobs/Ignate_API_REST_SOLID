
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { deleteUserUseCase } from 'use-cases/delete-user'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { getAllUserUseCase } from 'use-cases/get-all-user'

describe('Delete Users Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: deleteUserUseCase
  let suts: getAllUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new deleteUserUseCase(usersRepository)
    suts = new getAllUserUseCase(usersRepository)

  })

  it('should be able to get list all users', async () => {


    await usersRepository.create({

      name: "Vítor Guedes",
      email: "teste033@teste01.com",
      role: 'ADMIN',

      password_hash: await hash("123456", 6)
    })
    const user2 = await usersRepository.create({

      name: "Théo Marques",
      email: "teste02@teste01.com",
      role: 'MEMBER',
      password_hash: await hash("123456", 6)
    })

    const allUsersOld = await suts.getAll()
    console.log(allUsersOld)

    await sut.delete({ userId: user2.id })
    const { allUsers } = await suts.getAll()
    console.log(allUsers)
    expect(allUsers).toHaveLength(1)

  })
})
