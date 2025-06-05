import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository"
import { GetAdminUsersUseCase } from "use-cases/get-admin-users"

export function makeGetAdminUserUseCase() {

  const usersRepository = new PrismaUsersRepository()
  const getAdminUserUseCase = new GetAdminUsersUseCase(usersRepository)

  return getAdminUserUseCase
}
