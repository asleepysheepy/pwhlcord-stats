import 'server-only'

import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { ArenaTable } from '@/db/schema'
import { updateArenaCache } from '@/features/arenas/cache'

/**
 * Attempts to insert a new arena into the database
 *
 * @param data the new arena's data
 * @returns the newly created arena
 */
export async function createArena(data: typeof ArenaTable.$inferInsert) {
  const [arena] = await db.insert(ArenaTable).values(data).returning()

  if (arena == null) {
    throw new Error('Failed to create arena')
  }

  updateArenaCache(arena.id)

  return arena
}

/**
 * Attempts to update an arena in the database
 *
 * @param id the id of the arena to update
 * @param data the data to update
 * @returns the updated arena
 */
export async function updateArena(id: number, data: typeof ArenaTable.$inferInsert) {
  const [updatedArena] = await db.update(ArenaTable).set(data).where(eq(ArenaTable.id, id)).returning()

  if (updatedArena == null) {
    throw new Error('Failed to update arena')
  }

  updateArenaCache(updatedArena.id)

  return updatedArena
}

/**
 * Attempts to delete an arena from the database
 *
 * @param id the id of the arena to delete
 * @returns the deleted arena
 */
export async function deleteArena(id: number) {
  const [deletedArena] = await db.delete(ArenaTable).where(eq(ArenaTable.id, id)).returning()

  if (deletedArena == null) {
    throw new Error('Failed to delete arena')
  }

  updateArenaCache(deletedArena.id)

  return deletedArena
}
