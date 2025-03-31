import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'teste', 'production'])
    .default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('variavel inválida "*" ', _env.error.format())

  throw new Error('váriavel inválida')
}

export const env = _env.data
