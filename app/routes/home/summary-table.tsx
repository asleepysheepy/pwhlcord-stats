import { ChevronDownIcon, ChevronsUpDown, ChevronUpIcon } from 'lucide-react'
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

type sortOptions = 'yaps' | 'avg' | 'sum'

export function SummaryTable() {
  const { aggregateData } = useLoaderData<typeof loader>()

  const [sortBy, setSortBy] = useState<sortOptions>('yaps')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const sortedData = aggregateData.sort((a, b) => {
    return sortDir === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
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
          <TableHead className="text-center">#</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Games</TableHead>
          <TableHead>
            <div className="flex items-center">
              Average
              {renderSortButton('avg')}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              Total
              {renderSortButton('sum')}
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center">
              Yaps/60
              {renderSortButton('yaps')}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((team, index) => (
          <TableRow key={team.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="font-medium">
              <img
                className="mr-2 inline-block size-6"
                src={`/resources/team-logo/${team.logo.id}`}
                alt={team.logo.altText ?? ''}
              />
              {team.location}
            </TableCell>
            <TableCell>{team.count}</TableCell>
            <TableCell>{team.avg}</TableCell>
            <TableCell>{team.sum}</TableCell>
            <TableCell>{team.yaps}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
