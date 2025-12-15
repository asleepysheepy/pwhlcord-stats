import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { ArenaTable } from '@/db/schema/arena'
import { TeamTable } from '@/db/schema/team'
import { createdAt, updatedAt } from '@/db/schemaHelpers'

export const GameTable = pgTable('game', {
  id: serial().primaryKey(),
  createdAt,
  updatedAt,

  gameDate: timestamp({ withTimezone: true }).notNull(),
  season: text().notNull(),
  gameType: text().notNull(),
  homeTeamScore: integer(),
  awayTeamScore: integer(),
  gameLength: integer(),
  messageCount: integer(),
  isTakeoverTour: boolean(),
  attendance: integer(),

  homeTeamId: integer()
    .notNull()
    .references(() => TeamTable.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  awayTeamId: integer()
    .notNull()
    .references(() => TeamTable.id, { onDelete: 'restrict', onUpdate: 'cascade' }),

  arenaId: integer()
    .notNull()
    .references(() => ArenaTable.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const gameRelationships = relations(GameTable, ({ one }) => ({
  homeTeam: one(TeamTable, { fields: [GameTable.homeTeamId], references: [TeamTable.id], relationName: 'homeGames' }),
  awayTeam: one(TeamTable, { fields: [GameTable.awayTeamId], references: [TeamTable.id], relationName: 'awayGames' }),

  arena: one(ArenaTable, { fields: [GameTable.arenaId], references: [ArenaTable.id] }),
}))
