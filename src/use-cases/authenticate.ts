import { UsersRepository } from "repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-erros";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { InvalidTypeTextError } from "./errors/invalid-type-text";

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

    if (email === null || typeof email !== 'string' || password === null || typeof password !== 'string') {
      throw new InvalidTypeTextError();
    }

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
