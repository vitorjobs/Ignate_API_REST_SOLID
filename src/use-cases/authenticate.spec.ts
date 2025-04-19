/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, test } from 'vitest'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-erros'
import { compare, hash } from 'bcryptjs'

describe('Authenticate Use Case', () => {

  it('should be able to authenticate', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "Vítor Guedes",
      email: "vitor@teste01",
      password_hash: await hash("123456", 6)
    })

    const { user } = await sut.execute({
      email: "vitor@teste01",
      password: "123456"
    })

    await expect(user.email).toEqual(expect.any(String))

  })

  it('Não pode autenticar com o email incorreto', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "Vítor Guedes",
      email: "vitor@teste01",
      password_hash: await hash('123456', 6)
    })

    expect(() =>
      sut.execute({
        email: "vitor@teste0",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it.skip('should not receive the empty email', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      sut.execute({
        email: '', // email vazio
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it.skip('should not receive the empty password', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      sut.execute({
        email: "vitor@teste01",
        password: ''
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it.skip('should not be able to authenticate with wrong password', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const { user } = await sut.execute({
      email: "vitor@teste01",
      password: "123456"
    })

    const isPassWordCorrectlyHashed = await compare(
      '123458',
      user.password_hash
    )

    await expect(() =>
      sut.execute({
        email: "vitor@teste01",
        password: user.password_hash
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })
})
