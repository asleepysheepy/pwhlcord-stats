import 'server-only'

import { getCurrentUser } from '@/lib/auth'

/**
 * Gets the current user from the session and, if they exist, check if they're
 * allowed to create a new arena
 *
 * @returns Whether the user is allowed to create a new arena
 */
export async function canCreateArena() {
  const user = await getCurrentUser()

  return user != null
}

/**
 * Gets the current user from the session and, if they exist, check if they're
 * allowed to update an arena
 *
 * @returns Whether the user is allowed to update an arena
 */
export async function canUpdateArena() {
  const user = await getCurrentUser()

  return user != null
}

/**
 * Gets the current user from the session and, if they exist, check if they're
 * allowed to delete an arena
 *
 * @returns Whether the user is allowed to delete an arena
 */
export async function canDeleteArena() {
  const user = await getCurrentUser()

  return user != null
}
