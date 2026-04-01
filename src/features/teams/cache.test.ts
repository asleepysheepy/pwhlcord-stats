import { updateTag } from 'next/cache'
import { describe, expect, it, vi } from 'vitest'
import * as TeamsCache from './cache'

vi.mock(import('next/cache'), async (importOriginal) => ({
  ...(await importOriginal()),
  updateTag: vi.fn(),
}))

describe('Teams Cache', () => {
  describe('getTeamGlobalTag', () => {
    it('should return the arenas global tag', () => {
      const result = TeamsCache.getTeamGlobalTag()

      expect(result).toEqual('global:arenas')
    })
  })

  describe('getTeamIdTag', () => {
    it('should return the arenas id tag', () => {
      const result = TeamsCache.getTeamIdTag(15)

      expect(result).toEqual('id:15-arenas')
    })
  })

  describe('updateTeamCache', () => {
    it('should update the global tag', () => {
      TeamsCache.updateTeamCache(15)

      expect(updateTag).toHaveBeenNthCalledWith(1, 'global:arenas')
    })

    it('should update the id tag', () => {
      TeamsCache.updateTeamCache(15)

      expect(updateTag).toHaveBeenNthCalledWith(2, 'id:15-arenas')
    })
  })
})
