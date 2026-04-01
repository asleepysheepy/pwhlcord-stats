'use server'

import { z } from 'zod'
import { createTeam as createTeamDb, deleteTeam as deleteTeamDb, updateTeam as updateTeamDb } from '@/features/teams/db'
import { canCreateTeam, canDeleteTeam, canUpdateTeam } from '@/features/teams/permissions'
import { teamSchema } from '@/features/teams/schema'

/**
 * Ensures the creation data is valid and the user has permission to create a team,
 * if yes to both, creates a new team.
 *
 * @param unsafeData Team creation data
 * @returns An error status and a success or failure message
 */
export async function createTeam(unsafeData: z.infer<typeof teamSchema>) {
  const { success, data } = teamSchema.safeParse(unsafeData)

  if (!success || !(await canCreateTeam())) {
    return { error: true, message: 'There was an error creating this team' }
  }

  const team = await createTeamDb(data)
  return { error: false, message: `Successfully created new team, ${team.name}` }
}

/**
 * Ensures the update data is valid and the user has permission to create an team,
 * if yes to both, updates team.
 *
 * @param id the id of the team to update
 * @param unsafeData team update data
 * @returns An error status and a success or failure message
 */
export async function updateTeam(id: number, unsafeData: z.infer<typeof teamSchema>) {
  const { success, data } = teamSchema.safeParse(unsafeData)
  if (!success || !(await canUpdateTeam())) {
    return { error: true, message: 'There was an error updating this team' }
  }

  const team = await updateTeamDb(id, data)
  return { error: false, message: `Successfully updated the team, ${team.name}` }
}

/**
 * Ensures the user has permission to delete an team, if yes, deletes the team.
 *
 * @param id the id of the team to delete
 * @returns An error status and a success or failure message
 */
export async function deleteTeam(id: number) {
  if (!(await canDeleteTeam())) {
    return { error: true, message: 'There was an error deleting this team' }
  }

  const team = await deleteTeamDb(id)
  return { error: false, message: `Successfully deleted the team, ${team.name}` }
}
