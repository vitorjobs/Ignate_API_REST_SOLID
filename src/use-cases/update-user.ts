import { UsersRepository } from "repositories/users-repository";
import { Role, User } from "@prisma/client";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
  userId: string,
  role: Role,
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class updateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async update({
    userId, role }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

    const UserWithSameUserId = await this.usersRepository.findById(userId)
    if (!UserWithSameUserId) {
      throw new ResouceNotFoundError()
    }
    const updatedUser = await this.usersRepository.updateRole(userId, role);

    return {
      user: updatedUser,
    };

  }
}
