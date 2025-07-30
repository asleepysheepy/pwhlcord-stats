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
import { fetchGamesByTeam, fetchGameSummariesByTeam } from '~/lib/game.server'
import { fetchTeamsWithLogo } from '~/lib/team.server'

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
      <div className="flex flex-row items-center justify-between">
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

  const teams = await fetchTeamsWithLogo()
  const aggregateData = await fetchGameSummariesByTeam(teams, season)
  const games = await fetchGamesByTeam(season)

  return { teams, games, aggregateData }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PWHLCord Stats' },
    { name: 'description', content: 'Meta Stats for the unofficial PWHL Discord' },
  ]
}
