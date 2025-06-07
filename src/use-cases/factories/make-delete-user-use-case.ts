import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository"
import { deleteUserUseCase } from "use-cases/delete-user"

export function makeUserDeleteUseCase() {

  const usersRepository = new PrismaUsersRepository()
  const deleteUseCase = new deleteUserUseCase(usersRepository)

  return deleteUseCase
}
