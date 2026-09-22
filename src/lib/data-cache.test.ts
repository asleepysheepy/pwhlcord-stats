import { describe, expect, it } from 'vitest'
import { getGlobalTag, getIdTag } from '@/lib/data-cache'

describe('Cache Helpers', () => {
  describe('getGlobalTag', () => {
    it('should return the correct tag format', () => {
      expect(getGlobalTag('arenas')).toEqual('global:arenas')
    })
  })

  describe('getIdTag', () => {
    it('should return the correct tag format', () => {
      expect(getIdTag('arenas', '15')).toEqual('id:15-arenas')
    })
  })
})
