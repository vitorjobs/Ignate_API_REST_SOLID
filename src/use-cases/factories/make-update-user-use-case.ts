import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository"
import { updateUserUseCase } from "use-cases/update-user"

export function makeUpdateUserUseCase() {

  const usersRepository = new PrismaUsersRepository()
  const updatedUseCase = new updateUserUseCase(usersRepository)

  return updatedUseCase
}
