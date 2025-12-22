import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCurrentUser } from '@/lib/auth'
import * as ArenaPermissions from './permissions'

vi.mock(import('@/lib/auth'), async (importOriginal) => ({
  ...(await importOriginal()),
  getCurrentUser: vi.fn(),
}))

describe('Arena Permissions', () => {
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

  describe('canCreateArena', () => {
    it('should return true if a user is logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

      expect(await ArenaPermissions.canCreateArena()).toEqual(true)
    })

    it('should return false if a user in not logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(undefined)

      expect(await ArenaPermissions.canCreateArena()).toEqual(false)
    })
  })

  describe('canUpdateArena', () => {
    it('should return true if a user is logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

      expect(await ArenaPermissions.canUpdateArena()).toEqual(true)
    })

    it('should return false if a user in not logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(undefined)

      expect(await ArenaPermissions.canUpdateArena()).toEqual(false)
    })
  })

  describe('canDeleteArena', () => {
    it('should return true if a user is logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(mockUser)

      expect(await ArenaPermissions.canDeleteArena()).toEqual(true)
    })

    it('should return false if a user in not logged in', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(undefined)

      expect(await ArenaPermissions.canDeleteArena()).toEqual(false)
    })
  })
})
