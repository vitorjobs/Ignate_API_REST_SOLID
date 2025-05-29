import request from 'supertest'
import { app } from "app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Profile (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '123456'
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'jhondoe@example.com',
        password: '123456'
      })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
  })

  it.skip('Should not be able to get user profile', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        password: '123456'
      })

    await request(app.server)
      .post('/sessions')
      .send({
        email: 'jhondoe@example.com',
        password: '123456'
      })

    const profileResponse = await request(app.server)
      .get('/me')
    // Não enviar o token de autenticação

    expect(profileResponse.statusCode).toEqual(401)
    expect(profileResponse.body).toEqual({
      message: 'Unauthorized.'
    })
  })
})
