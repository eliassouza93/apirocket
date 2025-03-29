import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'mensagem servidor'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('servidor http rodando na porta 3333')
  })
