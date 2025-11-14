// // import request from 'supertest'
// // import { app } from "app";
// // import { afterAll, beforeAll, describe, expect, it } from "vitest";

// // describe('Update User Role (e2e)', () => {

// //   beforeAll(async () => {
// //     await app.ready()
// //   })

// //   afterAll(async () => {
// //     await app.close()
// //   })

// //   it('Should be able to get user profile', async () => {
// //     const response01 = await request(app.server)
// //       .post('/users')
// //       .send({
// //         name: 'Jhon Doe',
// //         email: 'jhondoe@example.com',
// //         password: '123456',
// //         userId: 'user-1',
// //         role: 'MEMBER' as const,
// //       })
// //     console.log(response01)
// //     const response = await request(app.server)
// //       .patch('/me')
// //       .send({
// //         userId: 'user-1',
// //         role: 'ADMIN' as const,
// //       })

// //     console.log(response)
// //     expect(response.body).toEqual({
// //       message: 'Validation error.'
// //     })
// //     // expect(response.statusCode).toEqual(201)


// //   })
// //   // it('Should not be able to update user role ', async () => {
// //   //   const response = await request(app.server)
// //   //     .patch('/me')
// //   //     .send({
// //   //       userId: 'user-1',
// //   //       role: 'MEMBER' as const,
// //   //     })

// //   //   expect(response.statusCode).toEqual(401)
// //   // })

// //   // it('Should be able to register', async () => {
// //   //   const response = await request(app.server)
// //   //     .patch('/me')
// //   //     .send({
// //   //       userId: 'user-1',
// //   //       role: 'MEMBER' as const,
// //   //     })

// //   //   expect(response.statusCode).toEqual(201)
// //   // })
// // })
// import request from 'supertest'
// import { app } from "app";
// import { afterAll, beforeAll, describe, expect, it } from "vitest";
// // import { createAndAuthenticateUser } from "test/factories/create-and-authenticate-user";
// describe('Update User Role (e2e)', () => {
//   beforeAll(async () => {
//     await app.ready()
//   })

//   afterAll(async () => {
//     await app.close()
//   })

//   it('should be able to update user role', async () => {

//     const updateResponse = await request(app.server)
//       .patch('/users/role') // Adjust this route to match your actual route

//       .send({
//         // userId: 'user-1',
//         userId,
//         role: 'ADMIN'
//       })

//     expect(updateResponse.statusCode).toEqual(201)


//   })

//   it.skip('should not be able to update role with invalid user ID', async () => {
//     // const { token } = await createAndAuthenticateUser(app, 'ADMIN')

//     const response = await request(app.server)
//       .patch('/users/role')
//       // .set('Authorization', `Bearer ${token}`)
//       .send({
//         userId: 'invalid-uuid',
//         role: 'ADMIN'
//       })

//     expect(response.statusCode).toEqual(400)
//     expect(response.body).toHaveProperty('message', 'Invalid request data')
//   })

//   it.skip('should not allow unauthorized role updates', async () => {
//     // Create a regular user (not admin)
//     // const { token: regularUserToken } = await createAndAuthenticateUser(app, 'MEMBER')

//     const response = await request(app.server)
//       .patch('/users/role')
//       // .set('Authorization', `Bearer ${regularUserToken}`)
//       .send({
//         userId: 'any-user-id',
//         role: 'ADMIN'
//       })

//     expect(response.statusCode).toEqual(403)
//   })
// })
import request from 'supertest'
import { app } from "app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from 'lib/prisma'

describe('Update User Role (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update user role', async () => {
    // 1. Create a test user first
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: 'hashed-password',
        role: 'MEMBER'
      }
    })

    // 2. Execute the role update
    const updateResponse = await request(app.server)
      .patch('/users/role')
      .send({
        userId: user.id,
        role: 'ADMIN'
      })

    // 3. Verify the response
    expect(updateResponse.statusCode).toEqual(201)

    // 4. Verify the update in database
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    expect(updatedUser?.role).toEqual('ADMIN')
  })

  it('should not be able to update role with invalid user ID', async () => {
    const response = await request(app.server)
      .patch('/users/role')
      .send({
        userId: 'invalid-uuid',
        role: 'ADMIN'
      })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('message', 'Validation error.')
  })

  it('should return 404 when trying to update non-existent user', async () => {
    const response = await request(app.server)
      .patch('/users/role')
      .send({
        userId: '00000000-0000-0000-0000-000000000000',
        role: 'ADMIN'
      })

    expect(response.statusCode).toEqual(404)
  })
})
