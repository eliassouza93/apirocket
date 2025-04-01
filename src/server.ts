import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import coockie from '@fastify/cookie'

const app = fastify()

app.register(coockie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
