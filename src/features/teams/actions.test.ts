import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTeam as createTeamDb, deleteTeam as deleteTeamDb, updateTeam as updateTeamDb } from '@/features/teams/db'
import { canCreateTeam, canDeleteTeam, canUpdateTeam } from '@/features/teams/permissions'
import * as TeamActions from './actions'

vi.mock(import('@/features/teams/db'), () => ({
  createTeam: vi.fn(),
  deleteTeam: vi.fn(),
  updateTeam: vi.fn(),
}))

vi.mock(import('@/features/teams/permissions'), () => ({
  canCreateTeam: vi.fn(),
  canUpdateTeam: vi.fn(),
  canDeleteTeam: vi.fn(),
}))

describe('Team Actions', () => {
  describe('createTeam', () => {
    beforeEach(() => {
      vi.mocked(canCreateTeam).mockResolvedValue(true)
      vi.mocked(createTeamDb).mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Name',
        location: 'City',
        shortName: 'CTY',
        primaryArenaId: 1,
      })
    })

    it('should return an error if schema parsing was not success', async () => {
      const mockData = { name: 'Name', location: 'City', shortName: 'CITY', primaryArenaId: 1 }

      const result = await TeamActions.createTeam(mockData)

      expect(result).toEqual({ error: true, message: 'There was an error creating this team' })
    })

    it('should return an error if the user does not have permission to create teams', async () => {
      vi.mocked(canCreateTeam).mockResolvedValue(false)
      const mockData = { name: 'Name', location: 'City', shortName: 'CTY', primaryArenaId: 1 }

      const result = await TeamActions.createTeam(mockData)

      expect(result).toEqual({ error: true, message: 'There was an error creating this team' })
    })

    it('should create a new team in the database', async () => {
      const mockData = { name: 'Name', location: 'City', shortName: 'CTY', primaryArenaId: 1 }

      await TeamActions.createTeam(mockData)

      expect(createTeamDb).toHaveBeenCalledWith(mockData)
    })

    it('should return a success message after creating the team', async () => {
      const mockData = { name: 'Name', location: 'City', shortName: 'CTY', primaryArenaId: 1 }

      const result = await TeamActions.createTeam(mockData)

      expect(result).toEqual({ error: false, message: 'Successfully created new team, Name' })
    })
  })

  describe('updateTeam', () => {
    beforeEach(() => {
      vi.mocked(canUpdateTeam).mockResolvedValue(true)
      vi.mocked(updateTeamDb).mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Name',
        location: 'City',
        shortName: 'CTY',
        primaryArenaId: 1,
      })
    })

    it('should return an error if schema parsing was not success', async () => {
      const mockData = { name: 'Name', location: 'City', shortName: 'CITY', primaryArenaId: 1 }

      const result = await TeamActions.updateTeam(1, mockData)

      expect(result).toEqual({ error: true, message: 'There was an error updating this team' })
    })

    it('should return an error if the user does not have permission to update teams', async () => {
      vi.mocked(canUpdateTeam).mockResolvedValue(false)
      const mockData = { name: 'Name', location: 'City', shortName: 'CTY', primaryArenaId: 1 }

      const result = await TeamActions.updateTeam(1, mockData)

      expect(result).toEqual({ error: true, message: 'There was an error updating this team' })
    })

    it('should update the team in the database', async () => {
      const mockData = { name: 'Name', location: 'City', shortName: 'CTY', primaryArenaId: 1 }

      await TeamActions.updateTeam(1, mockData)

      expect(updateTeamDb).toHaveBeenCalledWith(1, mockData)
    })

    it('should return a success message after updating the team', async () => {
      const mockData = { name: 'Name', location: 'City', shortName: 'CTY', primaryArenaId: 1 }

      const result = await TeamActions.updateTeam(1, mockData)

      expect(result).toEqual({ error: false, message: 'Successfully updated the team, Name' })
    })
  })

  describe('deleteTeam', () => {
    beforeEach(() => {
      vi.mocked(canDeleteTeam).mockResolvedValue(true)
      vi.mocked(deleteTeamDb).mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Name',
        location: 'City',
        shortName: 'CTY',
        primaryArenaId: 1,
      })
    })

    it('should return an error if the user does not have permission to delete teams', async () => {
      vi.mocked(canDeleteTeam).mockResolvedValue(false)

      const result = await TeamActions.deleteTeam(1)

      expect(result).toEqual({ error: true, message: 'There was an error deleting this team' })
    })

    it('should delete the team in the database', async () => {
      await TeamActions.deleteTeam(1)

      expect(deleteTeamDb).toHaveBeenCalledWith(1)
    })

    it('should return a success message after delete the team', async () => {
      const result = await TeamActions.deleteTeam(1)

      expect(result).toEqual({ error: false, message: 'Successfully deleted the team, Name' })
    })
  })
})
