import request from 'supertest'
import { app } from "app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from 'use-cases/errors/invalid-credentials-erros';

describe('Register (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authentication', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '123456'
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'jhondoe@example.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })


  it('should return 400 when both email and password are wrong', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '123456'
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'jhondoe1@example.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      message: new InvalidCredentialsError().message
    })
  })

  it('should return 404 for unexpected errors', async () => {
    const response = await request(app.server)
      .post('/sessiosns')
      .send({
        email: 'jhondoe@example.com',
        password: '123456'
      })
    expect(response.statusCode).toEqual(404)
  })
})
