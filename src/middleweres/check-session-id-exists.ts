import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log('Cookies recebidos:', request.cookies)

  const sessionId = request.cookies.sessionId
  if (!sessionId) {
    console.log('Erro: Nenhum sessionId encontrado nos cookies')
    return reply.status(401).send({ error: 'não autorizado' })
  }
}
