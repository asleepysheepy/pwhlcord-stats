import { useSearchParams } from 'react-router'
import type { Route } from './+types/home'
import { GameTable } from './game-table'
import { SummaryTable } from './summary-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { prisma } from '~/lib/db.server'

const CURRENT_SEASON = '20242025'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedSeason = searchParams.get('season') ?? CURRENT_SEASON

  function onSeasonSelectChange(value: string) {
    const params = new URLSearchParams()
    params.set('season', value)
    setSearchParams(params)
  }

  return (
    <main className="mx-auto max-w-3xl">
      <div className="flex flex-row justify-between">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">PWHLCord Yap Stats</h1>

        <label>
          <span>Season:</span>
          <Select value={selectedSeason} onValueChange={onSeasonSelectChange}>
            <SelectTrigger className="w-46">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20232024">2024</SelectItem>
              <SelectItem value="20242025">2024 - 2025</SelectItem>
              <SelectItem value="20252026">2025 - 2026</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-serif text-xl font-semibold sm:text-2xl">Summary</h2>

        <SummaryTable />
      </section>
      <section className="mt-12">
        <h2 className="mb-3 font-serif text-xl font-semibold sm:text-2xl">Game-by-game</h2>
        <GameTable />
      </section>
    </main>
  )
}

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams
  const season = searchParams.get('season') ?? CURRENT_SEASON

  const teams = (
    await prisma.team.findMany({
      include: {
        teamLogos: { select: { id: true, current: true, altText: true }, where: { current: true } },
      },
      orderBy: { location: 'asc' },
    })
  ).map(({ teamLogos, ...team }) => ({ ...team, logo: teamLogos[0] }))

  const aggregateData = (
    await Promise.all(
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
          ...team,
          avg: Math.round(data._avg.messageCount ?? 0),
          count: data._count.messageCount ?? 0,
          totalGameLength,
          sum,
          yaps: Math.round((sum / totalGameLength) * 3600),
        }
      }),
    )
  ).filter((a) => a.count !== 0)

  const games = (
    await prisma.game.findMany({
      where: { season },
      orderBy: { gameDate: 'asc' },
    })
  ).map((game, index) => {
    const homeTeam = teams.find((t) => game.homeTeamId === t.id)!
    const awayTeam = teams.find((t) => game.awayTeamId === t.id)!

    const minutes = Math.floor(game.gameLength / 60)
    const seconds = `${game.gameLength % 60}`.padStart(2, '0')

    return {
      ...game,
      gameNumber: index + 1,
      gameLengthFormatted: `${minutes}:${seconds}`,
      gameSummary: `${awayTeam.shortName} ${game.awayTeamScore} - ${game.homeTeamScore} ${homeTeam.shortName}`,
      homeTeam,
      awayTeam,
    }
  })

  return { teams, games, aggregateData }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PWHLCord Stats' },
    { name: 'description', content: 'Meta Stats for the unofficial PWHL Discord' },
  ]
}
