import { UsersRepository } from "repositories/users-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface deleteUserUseCaseRequest {
  userId: string,
}

interface deleteUserUseCaseResponse {
  user: string
}

export class deleteUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async delete({
    userId }: deleteUserUseCaseRequest): Promise<deleteUserUseCaseResponse> {

    const UserWithSameUserId = await this.usersRepository.findById(userId)
    if (!UserWithSameUserId) {
      throw new ResouceNotFoundError()
    }
    await this.usersRepository.delete(userId);

    return {
      user: `User with ID ${userId} has been deleted successfully.`,
    }
  }
}
