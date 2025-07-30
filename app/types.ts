import { type Team, type TeamLogo, type Game as PrismaGame } from '@prisma/client'

export type TeamWithLogo = Team & { logo: Pick<TeamLogo, 'id' | 'current' | 'altText'> }

export type Game = PrismaGame & {
  gameNumber: number
  gameLengthFormatted: string
  scoreline: string
  yaps: number
}

export type GameSummary = {
  teamId: number
  avg: number
  count: number
  totalGameLength: number
  sum: number
  yaps: number
}
