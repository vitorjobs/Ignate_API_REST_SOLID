import { UsersRepository } from "repositories/users-repository";
export class getAllUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async getAll(): Promise<{ allUsers: { password_hash?: string }[] }> {

    const allUsers = await this.usersRepository.findAll();

    return { allUsers }

  }
}
