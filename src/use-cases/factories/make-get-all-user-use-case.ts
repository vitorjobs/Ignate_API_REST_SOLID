import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository"
import { getAllUserUseCase } from "use-cases/get-all-user"

export function makeGetAllUserUserUseCase() {

  const usersRepository = new PrismaUsersRepository()
  const getAllUsersUseCase = new getAllUserUseCase(usersRepository)

  return getAllUsersUseCase
}
