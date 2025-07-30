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
import { type GameSummary } from '~/types'

type sortOptions = 'yaps' | 'avg' | 'sum'

export function SummaryTable() {
  const { aggregateData, teams } = useLoaderData<typeof loader>()

  const { renderSortButton, sortBy, sortDir } = useSortableTable<sortOptions>({
    initialSortBy: 'yaps',
    initialSortDirection: 'desc',
  })

  const sortedData = aggregateData.sort((a, b) => {
    return sortDir === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
  })

  if (!aggregateData || aggregateData.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground">
          Unable to find any game data for the selected season.
        </p>
      </div>
    )
  }

  const renderTableRow = (summary: GameSummary, index: number) => {
    const team = teams.find((t) => t.id === summary.teamId)!

    return (
      <TableRow key={index}>
        <TableCell className="text-center">{index + 1}</TableCell>
        <TableCell className="font-medium">
          <img
            className="mr-2 inline-block size-6"
            src={`/resources/team-logo/${team.logo.id}`}
            alt={team.logo.altText ?? ''}
          />
          {team.location}
        </TableCell>
        <TableCell>{summary.count}</TableCell>
        <TableCell>{summary.avg}</TableCell>
        <TableCell>{summary.sum}</TableCell>
        <TableCell>{summary.yaps}</TableCell>
      </TableRow>
    )
  }

  return (
    <Table>
      <TableHeader className="bg-primary text-primary-foreground">
        <TableRow>
          <TableHead className="text-center">#</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Games</TableHead>
          <TableHead>
            <div className="flex items-center">
              Average
              {renderSortButton('avg', 'average messages')}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              Total
              {renderSortButton('sum', 'total messages')}
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
      <TableBody>{sortedData.map((summary, index) => renderTableRow(summary, index))}</TableBody>
    </Table>
  )
}
