import Image from 'next/image'
import { toast } from 'sonner'
import { DeleteWithConfirmation } from '@/components/delete-with-confirmation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteTeam } from '@/features/teams/actions'
import { TeamForm } from '@/features/teams/components/team-form'

type Props = {
  teams: {
    id: number
    name: string
    location: string
    shortName: string
    primaryArenaId: number
    arenaName: string
  }[]
  arenas: {
    name: string
    id: number
  }[]
  showEditButton: boolean
  showDeleteButton: boolean
}

export function TeamsTable({ teams, arenas, showEditButton, showDeleteButton }: Props) {
  const showActions = showEditButton || showDeleteButton

  async function handleDelete(teamId: number) {
    const { error, message } = await deleteTeam(teamId)

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
          <TableHead className="sr-only">Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Primary Arena</TableHead>
          <TableHead className="text-center">
            Games
            <br />
            Played
          </TableHead>
          <TableHead className="text-center">
            Average
            <br />
            Attendance
          </TableHead>
          {showActions && <TableHead className="sr-only">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.id}>
            <TableCell>
              <Image
                src={`/img/team-logos/${team.shortName.toLowerCase()}.png`}
                alt={`${team.name}'s logo`}
                className="size-8"
                width="32"
                height="32"
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{team.name}</span>
                <span className="text-muted-foreground text-sm">{team.location}</span>
              </div>
            </TableCell>
            <TableCell>{team.arenaName}</TableCell>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">0</TableCell>
            {showActions && (
              <TableCell className="flex flex-row justify-end gap-2">
                {showEditButton && <TeamForm team={team} arenas={arenas} />}
                {showDeleteButton && (
                  <DeleteWithConfirmation entityName={team.name} onClick={() => handleDelete(team.id)} />
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
