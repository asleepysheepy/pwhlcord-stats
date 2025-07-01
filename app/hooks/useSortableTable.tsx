import { ChevronDownIcon, ChevronsUpDown, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'

type SortDirection = 'asc' | 'desc'

type Options<T> = {
  initialSortBy: T
  initialSortDirection: SortDirection
}

export function useSortableTable<T>({ initialSortBy, initialSortDirection }: Options<T>) {
  const [sortBy, setSortBy] = useState<T>(initialSortBy)
  const [sortDir, setSortDir] = useState<SortDirection>(initialSortDirection)

  const renderSortButton = (field: T) => {
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

  return { renderSortButton, sortBy, sortDir }
}
