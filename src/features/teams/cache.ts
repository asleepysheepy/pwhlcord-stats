import { updateTag } from 'next/cache'
import { getGlobalTag, getIdTag } from '@/lib/data-cache'

/**
 * @returns The teams global cache tag
 */
export function getTeamGlobalTag() {
  return getGlobalTag('teams')
}

/**
 *
 * @param id the id of the team to cache
 * @returns the team cache tag for the given id
 */
export function getTeamIdTag(id: number) {
  return getIdTag('teams', `${id}`)
}

/**
 * Invalidates the teams cache for the given arena id.
 *
 * @param id the id of the team to invalidate the cache for
 */
export function updateTeamCache(id: number) {
  updateTag(getTeamGlobalTag())
  updateTag(getTeamIdTag(id))
}
