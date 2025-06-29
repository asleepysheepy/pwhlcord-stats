import { ChevronDownIcon, ChevronsUpDown, ChevronUpIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { type loader } from './home'
import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

type sortOptions = 'gameNumber' | 'messageCount' | 'gameLength'

export function GameTable() {
  const { games } = useLoaderData<typeof loader>()

  const [sortBy, setSortBy] = useState<sortOptions>('gameNumber')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const sortedData = games.sort((a, b) => {
    const valueA = a[sortBy] ?? 0
    const valueB = b[sortBy] ?? 0
    return sortDir === 'asc' ? valueA - valueB : valueB - valueA
  })

  const renderSortButton = (field: sortOptions) => {
    let Icon = ChevronsUpDown
    let onClick
    if (sortBy === field) {
      if (sortDir === 'asc') {
        Icon = ChevronDownIcon
        onClick = () => setSortDir('desc')
      } else {
        Icon = ChevronUpIcon
        onClick = () => setSortDir('asc')
      }
    } else {
      onClick = () => {
        setSortBy(field)
        setSortDir('desc')
      }
    }

    return (
      <Button size={'icon'} onClick={onClick}>
        <Icon className="size-4" />
      </Button>
    )
  }

  return (
    <Table>
      <TableHeader className="bg-primary text-primary-foreground">
        <TableRow>
          <TableHead className="flex items-center">#{renderSortButton('gameNumber')}</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>
            <div className="flex items-center">
              Game Length
              {renderSortButton('gameLength')}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              Messages
              {renderSortButton('messageCount')}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((game) => (
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
                src={`/resources/team-logo/${game.awayTeam.logo.id}`}
                alt={game.awayTeam.logo.altText ?? ''}
              />
              <span>{game.gameSummary}</span>
              <img
                className="hidden size-5 sm:block"
                src={`/resources/team-logo/${game.homeTeam.logo.id}`}
                alt={game.homeTeam.logo.altText ?? ''}
              />
            </TableCell>
            <TableCell className="text-center">{game.gameLengthFormatted}</TableCell>
            <TableCell className="text-center">{game.messageCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
