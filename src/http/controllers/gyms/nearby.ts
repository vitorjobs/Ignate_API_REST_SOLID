import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchNearbyGymsUseCase } from "use-cases/factories/make-fetch-nearby-gyms-use-case"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {

	const nearbyGymsQuerySchema = z.object({
		latitude: z.number().refine((value) => {
			return value >= -90 && value <= 90
		}),
		longitude: z.number().refine((value) => {
			return value >= -180 && value <= 180
		}),
	})

	const {
		longitude, latitude
	} = nearbyGymsQuerySchema.parse(request.headers)

	const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
	const { gyms } = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return reply.status(200).send({
		gyms
	})
}
