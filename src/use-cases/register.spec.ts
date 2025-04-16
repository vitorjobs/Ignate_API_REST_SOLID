/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect, describe, it, test} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {

  it('should be able to  register' , async () =>{

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const {user} = await registerUseCase.execute({
      name: "Vítor Guedes",
      email: "vitor10@guedes.com",
      password:"123456"
    })

    expect(user.name).toEqual(expect.any(String))
   
  })

  it('should hash user password upon registration' , async () =>{

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const {user} = await registerUseCase.execute({
      name: "Vítor Guedes",
      email: "vitor10@guedes.com",
      password:"123456"
    })

    const isPassWordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    await expect(isPassWordCorrectlyHashed).toBe(true)

  })

  it('should not et able to register with same email twice' , async () =>{

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = "vitor10@guedes.com"

    const {user} = await registerUseCase.execute({
      name: "Vítor Guedes",
      email: email,
      password:"123456"
    })

    const isPassWordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    await expect(() =>
      registerUseCase.execute({
        name: "Vítor Guedes",
        email: email,
        password:"123456"
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})
