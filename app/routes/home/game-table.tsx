import { DateTime } from 'luxon'
import { useLoaderData } from 'react-router'
import { type loader } from './home'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useSortableTable } from '~/hooks/useSortableTable'
import { type Game } from '~/types'

type sortOptions = 'gameNumber' | 'messageCount' | 'gameLength' | 'yaps'

export function GameTable() {
  const { games, teams } = useLoaderData<typeof loader>()

  const { renderSortButton, sortBy, sortDir } = useSortableTable<sortOptions>({
    initialSortBy: 'gameNumber',
    initialSortDirection: 'asc',
  })

  const sortedData = games.sort((a, b) => {
    const valueA = a[sortBy] ?? 0
    const valueB = b[sortBy] ?? 0
    return sortDir === 'asc' ? valueA - valueB : valueB - valueA
  })

  if (!games || games.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground">
          Unable to find any game data for the selected season.
        </p>
      </div>
    )
  }

  const renderTableRow = (game: Game) => {
    const awayTeam = teams.find((team) => team.id === game.awayTeamId)!
    const homeTeam = teams.find((team) => team.id === game.homeTeamId)!

    return (
      <TableRow key={game.id}>
        <TableCell className="text-center">{game.gameNumber}</TableCell>
        <TableCell>
          {DateTime.fromJSDate(game.gameDate)
            .setLocale('en-CA')
            .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </TableCell>
        <TableCell className="flex flex-row gap-2 font-medium">
          <img
            className="hidden size-5 sm:block"
            src={`/resources/team-logo/${awayTeam.logo.id}`}
            alt={awayTeam.logo.altText ?? ''}
          />
          <span>{game.scoreline}</span>
          <img
            className="hidden size-5 sm:block"
            src={`/resources/team-logo/${homeTeam.logo.id}`}
            alt={homeTeam.logo.altText ?? ''}
          />
        </TableCell>
        <TableCell className="text-center">{game.gameLengthFormatted}</TableCell>
        <TableCell className="text-center">{game.messageCount}</TableCell>
        <TableCell className="text-center">{game.yaps}</TableCell>
      </TableRow>
    )
  }

  return (
    <Table>
      <TableHeader className="bg-primary text-primary-foreground">
        <TableRow>
          <TableHead className="flex items-center">
            #{renderSortButton('gameNumber', 'game number')}
          </TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>
            <div className="flex items-center">
              Game Length
              {renderSortButton('gameLength', 'game length')}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              Messages
              {renderSortButton('messageCount', 'message count')}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              Yaps/60
              {renderSortButton('yaps', 'yaps per sixty')}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{sortedData.map((game) => renderTableRow(game))}</TableBody>
    </Table>
  )
}
