import request from 'supertest'
import { app } from "app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Register (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
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
})
