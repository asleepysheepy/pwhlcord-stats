'use client'

import { Delete02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
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
    toast[error ? 'error' : 'success'](message)
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
                  <AlertDialog>
                    <AlertDialogTrigger render={<Button variant="destructive" />}>
                      <HugeiconsIcon icon={Delete02Icon} className="size-5" />
                      <span className="sr-only">Delete {arena.name}</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogMedia>
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete {arena.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {arena.name}? This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={() => handleDelete(arena.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
