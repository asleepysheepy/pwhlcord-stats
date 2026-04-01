import 'server-only'

import { getCurrentUser } from '@/lib/auth'

/**
 * Gets the current user from the session and, if they exist, check if they're
 * allowed to create a new team
 *
 * @returns Whether the user is allowed to create a new team
 */
export async function canCreateTeam() {
  const user = await getCurrentUser()

  return user != null
}

/**
 * Gets the current user from the session and, if they exist, check if they're
 * allowed to update an team
 *
 * @returns Whether the user is allowed to update an team
 */
export async function canUpdateTeam() {
  const user = await getCurrentUser()

  return user != null
}

/**
 * Gets the current user from the session and, if they exist, check if they're
 * allowed to delete an team
 *
 * @returns Whether the user is allowed to delete an team
 */
export async function canDeleteTeam() {
  const user = await getCurrentUser()

  return user != null
}
