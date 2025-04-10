import 'dotenv/config'
import {z} from 'zod'


const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'productions']).default('dev'),
  PORT: z.coerce.number().default(3333),
  HOST: z.coerce.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
  console.error('Invalid environmet variables', _env.error.format())
  throw new Error('Invalid environmet variables')
}

export const env = _env.data
