import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { authId, createdAt, updatedAt } from '@/db/schemaHelpers'

export const user = pgTable('user', {
  id: authId,
  createdAt,
  updatedAt,

  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
})

export const session = pgTable('session', {
  id: authId,
  createdAt,
  updatedAt,

  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: authId,
  createdAt,
  updatedAt,

  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
})

export const verification = pgTable('verification', {
  id: authId,
  createdAt,
  updatedAt,

  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
})
