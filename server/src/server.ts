import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors)

app.get('/', async () => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'beber'
      }
    }
  });

  return habits;
})

app.listen({
  port: 7000
}).then(() => {
  console.log('server running on port 7000')
})