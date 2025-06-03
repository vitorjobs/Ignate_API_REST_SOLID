import { prisma } from "lib/prisma";
import { Prisma, Role } from "@prisma/client"
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

  async findByRoleAdmin() {
    const adminUsers = await prisma.user.findMany({
      where: {
        role: 'ADMIN' // Filtra apenas usuários com role ADMIN
      },
      orderBy: {
        created_at: 'desc' // Ordena do mais recente para o mais antigo
      }
    });

    return adminUsers;
  }

  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password_hash: true, // Retornar o hash da senha conforme exigido pela interface
        created_at: true,
        role: true,
      },
      orderBy: {
        created_at: 'desc', // Ordenar por data de criação, do mais recente para o mais antigo
      },
    });

    return users;
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateRole(userId: string, role: Role) { // Tipo Role do Prisma
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
