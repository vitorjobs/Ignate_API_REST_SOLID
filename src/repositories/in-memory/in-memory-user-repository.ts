/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, Prisma, Role } from "@prisma/client"
import { error } from "console"
import { UsersRepository } from "repositories/users-repository"

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  updateRole(_userId: string, _role: Role): Promise<User> {
    throw new Error("Method not implemented.")
  }


  async findAll(): Promise<User[]> {

    return this.items

  }

  async findByRoleAdmin(): Promise<User[] | null> {
    // const user = this.items.filter((item) => item.role === "ADMIN")
    // if (!user) {
    //   return null
    // }
    // // console.log(user)
    // return user
    // return this.items.filter((item) => item.role === "ADMIN");
    // return this.items.filter((item) => item.role === "ADMIN");

    return this.items.filter((item) => item.role.toUpperCase() === "ADMIN");

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

  async delete(id: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === id)

    if (userIndex === -1) {
      throw new Error("User not found")
    }
    this.items.splice(userIndex, 1)
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: data.role as Role // Default role or adjust as needed
    }
    this.items.push(user)
    return user
  }
}
