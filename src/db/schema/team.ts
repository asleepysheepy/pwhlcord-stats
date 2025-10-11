import { relations } from 'drizzle-orm'
import { pgTable, serial, text } from 'drizzle-orm/pg-core'
import { GameTable } from '@/db/schema/game'
import { createdAt, updatedAt } from '@/db/schemaHelpers'

export const TeamTable = pgTable('team', {
  id: serial().primaryKey(),
  createdAt,
  updatedAt,

  location: text(),
  name: text(),
  shortName: text(),
})

export const TeamRelationships = relations(TeamTable, ({ many }) => ({
  homeGames: many(GameTable, { relationName: 'homeGames' }),
  awayGames: many(GameTable, { relationName: 'awayGames' }),
}))
