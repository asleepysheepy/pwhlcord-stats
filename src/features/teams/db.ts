import 'server-only'

import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { TeamTable } from '@/db/schema'
import { updateTeamCache } from './cache'

/**
 * Attempts to create a new team in the database
 *
 * @param data the new team's data
 * @returns the newly created team
 */
export async function createTeam(data: typeof TeamTable.$inferInsert) {
  const [team] = await db.insert(TeamTable).values(data).returning()

  if (team == null) {
    throw new Error('Failed to create Team')
  }

  updateTeamCache(team.id)

  return team
}

/**
 * Attempts to update an team in the database
 *
 * @param id the id of the team to update
 * @param data the data to update
 * @returns the updated team
 */
export async function updateTeam(id: number, data: typeof TeamTable.$inferInsert) {
  const [updatedTeam] = await db.update(TeamTable).set(data).where(eq(TeamTable.id, id)).returning()

  if (updatedTeam == null) {
    throw new Error('Failed to update team')
  }

  updateTeamCache(updatedTeam.id)

  return updatedTeam
}

/**
 * Attempts to delete an team from the database
 *
 * @param id the id of the team to delete
 * @returns the deleted team
 */
export async function deleteTeam(id: number) {
  const [deletedTeam] = await db.delete(TeamTable).where(eq(TeamTable.id, id)).returning()

  if (deletedTeam == null) {
    throw new Error('Failed to delete team')
  }

  updateTeamCache(deletedTeam.id)

  return deletedTeam
}
