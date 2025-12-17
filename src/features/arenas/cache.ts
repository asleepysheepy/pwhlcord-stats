import { updateTag } from 'next/cache'
import { getGlobalTag, getIdTag } from '@/lib/data-cache'

export function getArenaGlobalTag() {
  return getGlobalTag('arenas')
}

export function getArenaIdTag(id: number) {
  return getIdTag('arenas', `${id}`)
}

export function updateArenaCache(id: number) {
  updateTag(getArenaGlobalTag())
  updateTag(getArenaIdTag(id))
}
