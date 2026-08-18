import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

const isTest = process.env.NODE_ENV === 'test'
const databaseUrl = process.env.DATABASE_URL
const useMock = isTest || databaseUrl == null

export const db = useMock ? drizzle.mock({ schema }) : drizzle({ connection: process.env.DATABASE_URL!, schema })
