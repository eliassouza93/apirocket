import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import path from 'node:path'

export async function transactionsRoutes(app: FastifyInstance) {

  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions, }
  })
  app.get('/:id', async (request) => {
    request.params
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)

    const transactions = (await knex('transactions').where('id', id).first())

    return { transactions }

  })
  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount', {as:'amount'}).first()
    return {summary}
  })


  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId
    if(!sessionId){
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
      
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId
    })
    return reply.status(201).send('transação realizada com sucesso')
    
   

  })
}
