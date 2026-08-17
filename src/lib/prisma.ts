import { PrismaClient } from '@prisma/client'
import dns from 'node:dns'

// Force Node.js to prefer IPv6 when resolving hostnames.
// This fixes the 'ENOTFOUND' error when connecting to Supabase direct port (5432) from Vercel Serverless.
dns.setDefaultResultOrder('ipv6first')

const prismaClientSingleton = () => {
  // If we are on Vercel, force the correct direct IPv6 connection string to avoid pooler tenant errors
  const url = process.env.VERCEL ? 
    "postgresql://postgres:Niketan%402211%23@db.wsigywcdljlhpigbgwth.supabase.co:5432/postgres?sslmode=require" : 
    process.env.DATABASE_URL;
    
  return new PrismaClient({
    datasourceUrl: url,
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
