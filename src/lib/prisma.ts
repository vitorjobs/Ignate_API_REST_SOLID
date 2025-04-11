/**
 * ♻️DIP: Única instância do Prisma Client
 * - Evita múltiplas conexões
 * - Centraliza configuração
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
