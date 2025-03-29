import fastify from 'fastify'
import { knex } from './database.js'
import crypto from 'node:crypto'
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
    port: 3333,
  })
  .then(() => {
    console.log('servidor http rodando na porta 3333')
  })
