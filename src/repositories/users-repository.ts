import { Prisma, Role, User } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updateRole(userId: string, role: Role): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findByRoleAdmin(): Promise<User[] | null>;
}
