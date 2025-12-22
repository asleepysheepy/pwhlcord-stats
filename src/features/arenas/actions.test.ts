import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createArena as createArenaDb,
  deleteArena as deleteArenaDb,
  updateArena as updateArenaDb,
} from '@/features/arenas/db'
import { canCreateArena, canDeleteArena, canUpdateArena } from '@/features/arenas/permissions'
import * as ArenaActions from './actions'

vi.mock(import('@/features/arenas/db'), () => ({
  createArena: vi.fn(),
  deleteArena: vi.fn(),
  updateArena: vi.fn(),
}))

vi.mock(import('@/features/arenas/permissions'), () => ({
  canCreateArena: vi.fn(),
  canUpdateArena: vi.fn(),
  canDeleteArena: vi.fn(),
}))

describe('Arena Actions', () => {
  describe('createArena', () => {
    beforeEach(() => {
      vi.mocked(canCreateArena).mockResolvedValue(true)
      vi.mocked(createArenaDb).mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Arena Name',
        maxCapacity: 18000,
        location: 'City, ST',
      })
    })

    it('should return an error if schema parsing was not success', async () => {
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'incorrect format' }

      const result = await ArenaActions.createArena(mockData)

      expect(result).toEqual({ error: true, message: 'There was an error creating this arena' })
    })

    it('should return an error if the user does not have permission to create arenas', async () => {
      vi.mocked(canCreateArena).mockResolvedValue(false)
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' }

      const result = await ArenaActions.createArena(mockData)

      expect(result).toEqual({ error: true, message: 'There was an error creating this arena' })
    })

    it('should create a new arena in the database', async () => {
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' }

      await ArenaActions.createArena(mockData)

      expect(createArenaDb).toHaveBeenCalledWith(mockData)
    })

    it('should return a success message after creating the arena', async () => {
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' }

      const result = await ArenaActions.createArena(mockData)

      expect(result).toEqual({ error: false, message: 'Successfully created new arena, Arena Name' })
    })
  })

  describe('updateArena', () => {
    beforeEach(() => {
      vi.mocked(canUpdateArena).mockResolvedValue(true)
      vi.mocked(updateArenaDb).mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Arena Name',
        maxCapacity: 18000,
        location: 'City, ST',
      })
    })

    it('should return an error if schema parsing was not success', async () => {
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'incorrect format' }

      const result = await ArenaActions.updateArena(1, mockData)

      expect(result).toEqual({ error: true, message: 'There was an error updating this arena' })
    })

    it('should return an error if the user does not have permission to update arenas', async () => {
      vi.mocked(canUpdateArena).mockResolvedValue(false)
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' }

      const result = await ArenaActions.updateArena(1, mockData)

      expect(result).toEqual({ error: true, message: 'There was an error updating this arena' })
    })

    it('should update the arena in the database', async () => {
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' }

      await ArenaActions.updateArena(1, mockData)

      expect(updateArenaDb).toHaveBeenCalledWith(1, mockData)
    })

    it('should return a success message after updating the arena', async () => {
      const mockData = { name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' }

      const result = await ArenaActions.updateArena(1, mockData)

      expect(result).toEqual({ error: false, message: 'Successfully updated the arena, Arena Name' })
    })
  })

  describe('deleteArena', () => {
    beforeEach(() => {
      vi.mocked(canDeleteArena).mockResolvedValue(true)
      vi.mocked(deleteArenaDb).mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Arena Name',
        maxCapacity: 18000,
        location: 'City, ST',
      })
    })

    it('should return an error if the user does not have permission to delete arenas', async () => {
      vi.mocked(canDeleteArena).mockResolvedValue(false)

      const result = await ArenaActions.deleteArena(1)

      expect(result).toEqual({ error: true, message: 'There was an error deleting this arena' })
    })

    it('should delete the arena in the database', async () => {
      await ArenaActions.deleteArena(1)

      expect(deleteArenaDb).toHaveBeenCalledWith(1)
    })

    it('should return a success message after delete the arena', async () => {
      const result = await ArenaActions.deleteArena(1)

      expect(result).toEqual({ error: false, message: 'Successfully deleted the arena, Arena Name' })
    })
  })
})
