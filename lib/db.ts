import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// declare global {
//     var prisma : PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient({
//   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
// })

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

export default db