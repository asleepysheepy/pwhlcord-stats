import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const isTest = process.env.NODE_ENV === 'test'
const databaseUrl = process.env.DATABASE_URL
const useMock = isTest || databaseUrl == null

export const db = useMock ? drizzle.mock({ schema }) : drizzle({ client: neon(process.env.DATABASE_URL!), schema })
