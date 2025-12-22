import { updateTag } from 'next/cache'
import { describe, expect, it, vi } from 'vitest'
import * as ArenasCache from './cache'

vi.mock(import('next/cache'), async (importOriginal) => ({
  ...(await importOriginal()),
  updateTag: vi.fn(),
}))

describe('Arenas Cache', () => {
  describe('getArenaGlobalTag', () => {
    it('should return the arenas global tag', () => {
      const result = ArenasCache.getArenaGlobalTag()

      expect(result).toEqual('global:arenas')
    })
  })

  describe('getArenaIdTag', () => {
    it('should return the arenas id tag', () => {
      const result = ArenasCache.getArenaIdTag(15)

      expect(result).toEqual('id:15-arenas')
    })
  })

  describe('updateArenaCache', () => {
    it('should update the global tag', () => {
      ArenasCache.updateArenaCache(15)

      expect(updateTag).toHaveBeenNthCalledWith(1, 'global:arenas')
    })

    it('should update the id tag', () => {
      ArenasCache.updateArenaCache(15)

      expect(updateTag).toHaveBeenNthCalledWith(2, 'id:15-arenas')
    })
  })
})
