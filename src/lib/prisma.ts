/**
 * ♻️DIP: Única instância do Prisma Client
 * - Evita múltiplas conexões
 * - Centraliza configuração
 */
import { env } from "env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : []
})
