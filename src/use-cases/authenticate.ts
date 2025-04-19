import { UsersRepository } from "repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-erros";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string,
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private UsersRepository: UsersRepository,
  ) { }

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.UsersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatches = compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
