import { type Team } from '@prisma/client'
import { prisma } from '~/lib/db.server'
import { type Game, type GameSummary } from '~/types'

export async function fetchGameSummariesByTeam(
  teams: Pick<Team, 'id'>[],
  season: string,
): Promise<GameSummary[]> {
  const aggregateData = await Promise.all(
    teams.map(async (team) => {
      const data = await prisma.game.aggregate({
        _avg: { messageCount: true },
        _sum: { messageCount: true, gameLength: true },
        _count: { messageCount: true },
        where: { OR: [{ awayTeamId: team.id }, { homeTeamId: team.id }], season },
      })

      const sum = data._sum.messageCount ?? 0
      const totalGameLength = data._sum.gameLength ?? 0

      return {
        teamId: team.id,
        avg: Math.round(data._avg.messageCount ?? 0),
        count: data._count.messageCount ?? 0,
        totalGameLength,
        sum,
        yaps: Math.round((sum / totalGameLength) * 3600) || 0,
      }
    }),
  )

  // Filter out any teams that don't have games (example, expansion teams)
  return aggregateData.filter((a) => a.count !== 0)
}

export async function fetchGamesByTeam(season: string, teamId?: number): Promise<Game[]> {
  const whereClause = !teamId
    ? { season }
    : { OR: [{ awayTeamId: teamId }, { homeTeamId: teamId }], season }

  const games = await prisma.game.findMany({
    include: {
      awayTeam: { select: { shortName: true } },
      homeTeam: { select: { shortName: true } },
    },
    where: whereClause,
    orderBy: { gameDate: 'asc' },
  })

  return games.map(({ homeTeam, awayTeam, ...game }, index) => {
    const minutes = Math.floor(game.gameLength / 60)
    const seconds = `${game.gameLength % 60}`.padStart(2, '0')

    return {
      ...game,
      gameNumber: index + 1,
      gameLengthFormatted: `${minutes}:${seconds}`,
      scoreline: `${awayTeam.shortName} ${game.awayTeamScore} - ${game.homeTeamScore} ${homeTeam.shortName}`,
      yaps: Math.round(((game.messageCount ?? 0) / game.gameLength) * 3600),
    }
  })
}
