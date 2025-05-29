import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckInUseCase } from 'use-cases/factories/make-validate-check-in-use-case'
import { z } from 'zod'
/**
 * @swagger
 * /check-ins/{checkInId}/validate:
 *   patch:
 *     summary: Validate a check-in
 *     tags: [Check-ins]
 *     parameters:
 *       - in: path
 *         name: checkInId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Check-in validated successfully
 */
export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
