import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

import { TeamTable } from '@/db/schema/team'
import { createdAt, updatedAt } from '@/db/schemaHelpers'

export const ArenaTable = pgTable('arena', {
  id: serial().primaryKey(),
  createdAt,
  updatedAt,

  name: text().notNull(),
  maxCapacity: integer().notNull(),
  location: text().notNull(),
})

export const ArenaRelationships = relations(ArenaTable, ({ one }) => ({
  primaryTeam: one(TeamTable),
}))
