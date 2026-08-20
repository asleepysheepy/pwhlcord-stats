'use client'

import { toast } from 'sonner'
import { DeleteWithConfirmation } from '@/components/delete-with-confirmation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteArena } from '@/features/arenas/actions'
import { ArenaForm } from '@/features/arenas/components/arena-form'

type Props = {
  arenas: {
    id: number
    name: string
    maxCapacity: number
    location: string
    gamesHosted: number
  }[]
  showEditButton: boolean
  showDeleteButton: boolean
}

export function ArenasTable({ arenas, showEditButton = false, showDeleteButton = false }: Props) {
  const showActions = showEditButton || showDeleteButton

  async function handleDelete(id: number) {
    const { error, message } = await deleteArena(id)

    if (error) {
      toast.error(message)
    } else {
      toast.success(message)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="font semibold text-lg">
          <TableHead>Arena</TableHead>
          <TableHead className="text-center">
            Max
            <br />
            Capacity
          </TableHead>
          <TableHead className="text-center">
            Games
            <br />
            Hosted
          </TableHead>
          {showActions && <TableHead className="sr-only">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {arenas.map((arena) => (
          <TableRow key={arena.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{arena.name}</span>
                <span className="text-muted-foreground text-sm">{arena.location}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">{arena.maxCapacity}</TableCell>
            <TableCell className="text-center">{arena.gamesHosted}</TableCell>
            {showActions && (
              <TableCell className="flex flex-row justify-end gap-2">
                {showEditButton && <ArenaForm arena={arena} />}
                {showDeleteButton && (
                  <DeleteWithConfirmation entityName={arena.name} onClick={() => handleDelete(arena.id)} />
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
