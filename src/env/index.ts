import { config } from 'dotenv'
import { z } from 'zod'

// definir qual o formato do process.env

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  // development, test, production
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid envoriment variables!', _env.error.format())

  throw new Error('Invalid envoriment variables!')
}

export const env = _env.data
