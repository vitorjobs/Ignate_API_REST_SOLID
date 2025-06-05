
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { GetAdminUsersUseCase } from 'use-cases/get-admin-users'

describe('Get list Admin Users Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetAdminUsersUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetAdminUsersUseCase(usersRepository)

  })

  it('should be able to get list all admin users', async () => {

    await usersRepository.create({
      name: "Vítor Guedes",
      email: "teste03@teste01.com",
      role: "ADMIN",
      password_hash: await hash("123456", 6)
    })

    await usersRepository.create({
      name: "Théo Marques",
      email: "teste02@teste01.com",
      role: "MEMBER",
      password_hash: await hash("123456", 6)
    })

    const { users } = await sut.handle()
    expect(users).toHaveLength(1)
  })
})
