import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCurrentUser } from '@/lib/auth'
import * as TeamPermissions from './permissions'

vi.mock(import('@/lib/auth'), async (importOriginal) => ({
  ...(await importOriginal()),
  getCurrentUser: vi.fn(),
}))

describe('Team Permissions', () => {
  let mockUser: {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    emailVerified: boolean
    name: string
  }

  beforeEach(() => {
    mockUser = {
      id: '12345',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'test@test.com',
      emailVerified: true,
      name: 'Test User',
    }
  })

  describe('canCreateTeam', () => {
    it('should return true if a user is logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

      expect(await TeamPermissions.canCreateTeam()).toEqual(true)
    })

    it('should return false if a user in not logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(undefined)

      expect(await TeamPermissions.canCreateTeam()).toEqual(false)
    })
  })

  describe('canUpdateTeam', () => {
    it('should return true if a user is logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

      expect(await TeamPermissions.canUpdateTeam()).toEqual(true)
    })

    it('should return false if a user in not logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(undefined)

      expect(await TeamPermissions.canUpdateTeam()).toEqual(false)
    })
  })

  describe('canDeleteTeam', () => {
    it('should return true if a user is logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

      expect(await TeamPermissions.canDeleteTeam()).toEqual(true)
    })

    it('should return false if a user in not logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(undefined)

      expect(await TeamPermissions.canDeleteTeam()).toEqual(false)
    })
  })
})
