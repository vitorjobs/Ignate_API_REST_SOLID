import { UsersRepository } from "repositories/users-repository";

export class GetAdminUsersUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async handle() {
    const users = await this.usersRepository.findByRoleAdmin();

    return {
      users
    };
  }
}
