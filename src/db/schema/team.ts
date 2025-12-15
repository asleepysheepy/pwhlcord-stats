import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'
import { ArenaTable } from '@/db/schema/arena'
import { GameTable } from '@/db/schema/game'
import { createdAt, updatedAt } from '@/db/schemaHelpers'

export const TeamTable = pgTable('team', {
  id: serial().primaryKey(),
  createdAt,
  updatedAt,

  location: text(),
  name: text(),
  shortName: text(),

  primaryArenaId: integer()
    .notNull()
    .references(() => ArenaTable.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const TeamRelationships = relations(TeamTable, ({ many, one }) => ({
  homeGames: many(GameTable, { relationName: 'homeGames' }),
  awayGames: many(GameTable, { relationName: 'awayGames' }),

  primaryArena: one(ArenaTable, { fields: [TeamTable.primaryArenaId], references: [ArenaTable.id] }),
}))
