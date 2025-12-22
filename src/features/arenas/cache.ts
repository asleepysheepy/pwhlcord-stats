import { updateTag } from 'next/cache'
import { getGlobalTag, getIdTag } from '@/lib/data-cache'

/**
 * @returns The arenas global cache tag
 */
export function getArenaGlobalTag() {
  return getGlobalTag('arenas')
}

/**
 *
 * @param id the id of the arena to cache
 * @returns the arena cache tag for the given id
 */
export function getArenaIdTag(id: number) {
  return getIdTag('arenas', `${id}`)
}

/**
 * Invalidates the arenas cache for the given arena id.
 *
 * @param id the id of the arena to invalidate the cache for
 */
export function updateArenaCache(id: number) {
  updateTag(getArenaGlobalTag())
  updateTag(getArenaIdTag(id))
}
