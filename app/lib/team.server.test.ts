import { describe, expect, it, vitest } from 'vitest'
import { prisma } from '~/lib/db.server'
import { fetchTeamsWithLogo } from '~/lib/team.server'

vitest.mock('~/lib/db.server', async () => ({
  ...(await vitest.importActual('~/lib/db.server')),
  prisma: {
    team: {
      findMany: vitest.fn(),
    },
  },
}))

describe('Team database helpers', () => {
  describe('fetchTeamsWithLogo', () => {
    it('should return the correct team information', async () => {
      const mockTeam = {
        id: 1,
        location: 'Capital City',
        name: 'Capitols',
        shortName: 'CCC',
        createdAt: new Date(),
        updatedAt: new Date(),
        teamLogos: [{ id: 'abc123', current: true, altText: 'lorem ipsum' }],
      }

      vitest.mocked(prisma.team.findMany).mockResolvedValue([mockTeam])

      const result = await fetchTeamsWithLogo()

      expect(result).toHaveLength(1)
      const teamResult = result[0]

      expect(teamResult.id).toBe(1)
      expect(teamResult.location).toBe('Capital City')
      expect(teamResult.name).toBe('Capitols')
      expect(teamResult.shortName).toBe('CCC')
    })

    it('should return only the current team logo', async () => {
      const mockTeam = {
        id: 1,
        location: 'Capital City',
        name: 'Capitols',
        shortName: 'CCC',
        createdAt: new Date(),
        updatedAt: new Date(),
        teamLogos: [
          { id: 'abc123', current: true, altText: 'lorem ipsum' },
          { id: 'def456', current: false, altText: 'lorem ipsum' },
        ],
      }

      vitest.mocked(prisma.team.findMany).mockResolvedValue([mockTeam])

      const result = await fetchTeamsWithLogo()
      expect(result[0].logo).toEqual({
        id: 'abc123',
        current: true,
        altText: 'lorem ipsum',
      })
    })
  })
})
