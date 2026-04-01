import { eq } from 'drizzle-orm'
import { cacheTag } from 'next/cache'
import { db } from '@/db'
import { ArenaTable, TeamTable } from '@/db/schema'
import { getTeamGlobalTag } from '@/features/teams/cache'
import { TeamForm } from '@/features/teams/components/team-form'
import { canCreateTeam, canDeleteTeam, canUpdateTeam } from '@/features/teams/permissions'

export default async function TeamsPage() {
  const arenas = await fetchArenas()
  const teams = await fetchTeams()

  const showNewButton = await canCreateTeam()
  const showUpdateButton = await canUpdateTeam()
  const showDeleteButton = await canDeleteTeam()

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-12">
        <div className="flex flex-row justify-between">
          <h1 className="mb-6 text-3xl font-semibold">Teams</h1>
          {showNewButton && <TeamForm arenas={arenas} />}
        </div>
        <p className="text-muted-foreground text-xl">A list of all PWHL teams</p>
      </div>

      {/* <TeamsTable /> */}
    </div>
  )
}

async function fetchArenas() {
  const arenas = await db.select({
    id: ArenaTable.id,
    name: ArenaTable.name,
  })
  .from(ArenaTable)
  .orderBy(ArenaTable.name)

  return arenas
}

async function fetchTeams() {
  'use cache'
  cacheTag(getTeamGlobalTag())

  const teams = await db
    .select({
      id: TeamTable.id,
      name: TeamTable.name,
      location: TeamTable.location,
      shortName: TeamTable.shortName,
    })
    .from(TeamTable)
    .innerJoin(ArenaTable, eq(TeamTable.primaryArenaId, ArenaTable.id))
    .orderBy(TeamTable.name)

  return teams
}
