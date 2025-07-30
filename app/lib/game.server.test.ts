import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { prisma } from '~/lib/db.server'
import { fetchGamesByTeam, fetchGameSummariesByTeam } from '~/lib/game.server'

vitest.mock('~/lib/db.server', async () => ({
  ...(await vitest.importActual('~/lib/db.server')),
  prisma: {
    game: {
      aggregate: vitest.fn(),
      findMany: vitest.fn(),
    },
  },
}))

describe('game database helpers', () => {
  describe('fetchGamesByTeam', () => {
    beforeEach(() => {
      const mockGames = [
        {
          id: 1,
          gameDate: new Date('2025-01-17'),
          season: '20242025',
          gameType: 'REGULAR_SEASON',
          homeTeamScore: 2,
          awayTeamScore: 1,
          gameLength: 3600,
          messageCount: 1312,
          homeTeamId: 1,
          homeTeam: {
            shortName: 'ABC',
          },
          awayTeamId: 2,
          awayTeam: {
            shortName: 'DEF',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          gameDate: new Date('2025-01-18'),
          season: '20242025',
          gameType: 'REGULAR_SEASON',
          homeTeamScore: 1,
          awayTeamScore: 2,
          gameLength: 3750,
          messageCount: 1312,
          homeTeamId: 1,
          homeTeam: {
            shortName: 'ABC',
          },
          awayTeamId: 3,
          awayTeam: {
            shortName: 'GHI',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          gameDate: new Date('2025-01-19'),
          season: '20242025',
          gameType: 'REGULAR_SEASON',
          homeTeamScore: 2,
          awayTeamScore: 1,
          gameLength: 3900,
          messageCount: 1312,
          homeTeamId: 3,
          homeTeam: {
            shortName: 'GHI',
          },
          awayTeamId: 2,
          awayTeam: {
            shortName: 'DEF',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      vitest.mocked(prisma.game.findMany).mockResolvedValue(mockGames)
    })

    it('should fetch all games when not passed a teamId', async () => {
      await fetchGamesByTeam('20242025')

      expect(prisma.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { season: '20242025' },
        }),
      )
    })

    it("should fetch only the passed team's games when passed a teamId", async () => {
      await fetchGamesByTeam('20242025', 3)

      expect(prisma.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { OR: [{ awayTeamId: 3 }, { homeTeamId: 3 }], season: '20242025' },
        }),
      )
    })

    it('should return the basic game information', async () => {
      const results = await fetchGamesByTeam('20242025')
      const game = results[0]

      expect(game.id).toBe(1)
      expect(game.gameDate).toEqual(new Date('2025-01-17'))
      expect(game.season).toBe('20242025')
      expect(game.gameType).toBe('REGULAR_SEASON')
      expect(game.homeTeamScore).toBe(2)
      expect(game.awayTeamScore).toBe(1)
      expect(game.gameLength).toBe(3600)
      expect(game.messageCount).toBe(1312)
      expect(game.homeTeamId).toBe(1)
      expect(game.awayTeamId).toBe(2)
    })

    it('should return the game number', async () => {
      const results = await fetchGamesByTeam('20242025')

      expect(results[0].gameNumber).toBe(1)
      expect(results[1].gameNumber).toBe(2)
      expect(results[2].gameNumber).toBe(3)
    })

    it('should return the formatted game length', async () => {
      const results = await fetchGamesByTeam('20242025')

      expect(results[0].gameLengthFormatted).toBe('60:00')
      expect(results[1].gameLengthFormatted).toBe('62:30')
      expect(results[2].gameLengthFormatted).toBe('65:00')
    })

    it('should return the formatted game scoreline', async () => {
      const results = await fetchGamesByTeam('20242025')

      expect(results[0].scoreline).toBe('DEF 1 - 2 ABC')
      expect(results[1].scoreline).toBe('GHI 2 - 1 ABC')
      expect(results[2].scoreline).toBe('DEF 1 - 2 GHI')
    })

    it('should return the yaps per 60', async () => {
      const results = await fetchGamesByTeam('20242025')

      expect(results[0].yaps).toBe(1312)
      expect(results[1].yaps).toBe(1260)
      expect(results[2].yaps).toBe(1211)
    })
  })

  describe('fetchGameSummariesByTeam', () => {
    beforeEach(() => {
      vitest
        .mocked(prisma.game.aggregate)
        .mockResolvedValue({
          _avg: { messageCount: 1312 },
          _sum: {
            messageCount: 13120,
            gameLength: 36490,
          },
          _count: { messageCount: 10 },
          _min: {},
          _max: {},
        })
        .mockResolvedValueOnce({
          _avg: { messageCount: 1312 },
          _sum: {
            messageCount: 13120,
            gameLength: 36490,
          },
          _count: { messageCount: 0 },
          _min: {},
          _max: {},
        })
        .mockResolvedValueOnce({
          _avg: {},
          _sum: {},
          _count: { messageCount: 10 },
          _min: {},
          _max: {},
        })
    })

    it('should filter out teams with no games', async () => {
      const result = await fetchGameSummariesByTeam([{ id: 1 }, { id: 2 }, { id: 3 }], '20242025')

      expect(result).toHaveLength(2)
    })

    it('should return proper defaults', async () => {
      const result = await fetchGameSummariesByTeam([{ id: 1 }, { id: 2 }, { id: 3 }], '20242025')
      const summary = result[0]

      expect(summary.teamId).toBe(2)
      expect(summary.avg).toBe(0)
      expect(summary.count).toBe(10)
      expect(summary.sum).toBe(0)
      expect(summary.totalGameLength).toBe(0)
      expect(summary.yaps).toBe(0)
    })

    it('should return the correct game summary information', async () => {
      const result = await fetchGameSummariesByTeam([{ id: 1 }, { id: 2 }, { id: 3 }], '20242025')
      const summary = result[1]

      expect(summary.teamId).toBe(3)
      expect(summary.avg).toBe(1312)
      expect(summary.count).toBe(10)
      expect(summary.sum).toBe(13120)
      expect(summary.totalGameLength).toBe(36490)
      expect(summary.yaps).toBe(1294)
    })
  })
})
