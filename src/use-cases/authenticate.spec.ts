
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-erros'
import { hash } from 'bcryptjs'
import { InvalidTypeTextError } from './errors/invalid-type-text'

describe('Authenticate Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase
  const emailInvalid = [
    null,
    undefined,
    12345,
    true,
    {},
    []
  ]

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)

  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: "Vítor Guedes",
      email: "vitor@teste01",
      password_hash: await hash("123456", 6)
    })

    const { user } = await sut.execute({
      email: "vitor@teste01",
      password: "123456"
    })

    expect(user.email).toEqual("vitor@teste01")
  })

  it('should not authenticate with wrong email', async () => {
    await usersRepository.create({
      name: "Vítor Guedes",
      email: "vitor@teste01",
      password_hash: await hash('123456', 6)
    })

    await expect(() =>
      sut.execute({
        email: "wrong@email.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it.skip('should not authenticate with wrong password', async () => {
    await usersRepository.create({
      name: "Vítor Guedes",
      email: "vitor@teste01",
      password_hash: await hash("123456", 6)
    })

    await expect(() =>
      sut.execute({
        email: "vitor@teste01",
        password: "123458"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate with non-string email', async () => {
    await expect(() =>
      sut.execute({
        email: '',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate with empty password', async () => {
    await expect(() =>
      sut.execute({
        email: "vitor@teste01",
        password: ''
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate with type text incorrecty', async () => {
    await expect(() =>
      sut.execute({
        email: emailInvalid,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidTypeTextError)
  })
})
