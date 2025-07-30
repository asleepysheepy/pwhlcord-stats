import { prisma } from '~/lib/db.server'
import { type TeamWithLogo } from '~/types'

export async function fetchTeamsWithLogo(): Promise<TeamWithLogo[]> {
  const teams = await prisma.team.findMany({
    include: {
      teamLogos: { select: { id: true, current: true, altText: true }, where: { current: true } },
    },
    orderBy: { location: 'asc' },
  })

  return teams.map(({ teamLogos, ...team }) => ({ ...team, logo: teamLogos[0] }))
}
