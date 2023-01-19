import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoute } from './routes';

const app = Fastify();

app.register(cors)
app.register(appRoute)

app.listen({
  port: 7000
}).then(() => {
  console.log('server running on port 7000')
})