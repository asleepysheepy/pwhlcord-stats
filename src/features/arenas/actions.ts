'use server'

import { countDistinct, eq } from 'drizzle-orm'
import { cacheTag } from 'next/cache'
import { z } from 'zod'
import { db } from '@/db'
import { ArenaTable, GameTable } from '@/db/schema'
import { getArenaGlobalTag } from '@/features/arenas/cache'
import {
  createArena as createArenaDb,
  deleteArena as deleteArenaDb,
  updateArena as updateArenaDb,
} from '@/features/arenas/db'
import { canCreateArena, canDeleteArena, canUpdateArena } from '@/features/arenas/permissions'
import { arenaSchema } from '@/features/arenas/schema'

/**
 * Fetches a list of all arenas.
 *
 * @returns A list of arenas including id, name, capacity, location,
 *   and number of games hosted, sorted by arena name.
 */
export async function fetchArenas() {
  'use cache'
  cacheTag(getArenaGlobalTag())

  const arenas = await db
    .select({
      id: ArenaTable.id,
      name: ArenaTable.name,
      maxCapacity: ArenaTable.maxCapacity,
      location: ArenaTable.location,
      gamesHosted: countDistinct(GameTable),
    })
    .from(ArenaTable)
    .leftJoin(GameTable, eq(GameTable.arenaId, ArenaTable.id))
    .orderBy(ArenaTable.name)
    .groupBy(ArenaTable.id)

  return arenas
}

/**
 * Ensures the creation data is valid and the user has permission to create an arena,
 * if yes to both, creates a new arena.
 *
 * @param unsafeData Arena creation data
 * @returns An error status and a success or failure message
 */
export async function createArena(unsafeData: z.infer<typeof arenaSchema>) {
  const { success, data } = arenaSchema.safeParse(unsafeData)

  if (!success || !(await canCreateArena())) {
    return { error: true, message: 'There was an error creating this arena' }
  }

  const arena = await createArenaDb(data)
  return { error: false, message: `Successfully created new arena, ${arena.name}` }
}

/**
 * Ensures the update data is valid and the user has permission to create an arena,
 * if yes to both, updates arena.
 *
 * @param id the id of the arena to update
 * @param unsafeData arena update data
 * @returns An error status and a success or failure message
 */
export async function updateArena(id: number, unsafeData: z.infer<typeof arenaSchema>) {
  const { success, data } = arenaSchema.safeParse(unsafeData)
  if (!success || !(await canUpdateArena())) {
    return { error: true, message: 'There was an error updating this arena' }
  }

  const arena = await updateArenaDb(id, data)
  return { error: false, message: `Successfully updated the arena, ${arena.name}` }
}

/**
 * Ensures the user has permission to delete an arena, if yes, deletes the arena.
 *
 * @param id the id of the arena to delete
 * @returns An error status and a success or failure message
 */
export async function deleteArena(id: number) {
  if (!(await canDeleteArena())) {
    return { error: true, message: 'There was an error deleting this arena' }
  }

  const arena = await deleteArenaDb(id)
  return { error: false, message: `Successfully deleted the arena, ${arena.name}` }
}
