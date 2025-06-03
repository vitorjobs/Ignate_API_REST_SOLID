/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, Prisma, Role } from "@prisma/client"
import { UsersRepository } from "repositories/users-repository"

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  updateRole(_userId: string, _role: Role): Promise<User> {
    throw new Error("Method not implemented.")
  }

  delete(_id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

  async findAll(): Promise<User[]> {

    return this.items

  }

  async findByRoleAdmin(): Promise<User[]> {
    const users = this.items.find((item) => item.role === 'ADMIN')
    if (!users) {
      return Promise.resolve([])
    }
    return Promise.resolve([users])
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {

    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: 'USER' as Role // Default role or adjust as needed
    }
    this.items.push(user)
    return user
  }
}
