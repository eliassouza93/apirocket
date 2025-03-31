import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

console.log(process.env.DATABASE_URL)

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL end not found')
}

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
