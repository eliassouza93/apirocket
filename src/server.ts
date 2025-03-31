import fastify from 'fastify'
import { knex } from './database.js'
import crypto from 'node:crypto'
import { env } from './env/index.js'
const app = fastify()

app.get('/', async () => {
  const transaction = await knex('documents')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação teste',
    })
    .returning('*')
  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('servidor http rodando na porta 3333')
  })
