import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from 'use-cases/errors/invalid-credentials-erros'
import { makeAuthenticateUseCase } from 'use-cases/factories/make-authenticate-use-case'

import { z } from 'zod'


export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        // Define the cookie options
        // The name of the cookie

        path: '/',
        // The cookie will be available on all routes
        secure: true,
        // Use secure cookies in production (HTTPS)
        sameSite: true,
        // Set the cookie to be accessible only via HTTP requests
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
