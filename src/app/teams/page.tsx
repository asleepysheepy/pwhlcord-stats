import { eq } from 'drizzle-orm'
import { type Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { Suspense } from 'react'
import { Loader } from '@/components/loader'
import { db } from '@/db'
import { ArenaTable, TeamTable } from '@/db/schema'
import { fetchArenas } from '@/features/arenas/actions'
import { getTeamGlobalTag } from '@/features/teams/cache'
import { TeamForm } from '@/features/teams/components/team-form'
import { TeamsTable } from '@/features/teams/components/teams-table'
import { canCreateTeam, canDeleteTeam, canUpdateTeam } from '@/features/teams/permissions'

export default async function TeamsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-12">
        <div className="flex flex-row justify-between">
          <h1 className="mb-6 text-3xl font-semibold">Teams</h1>
          <Suspense>
            <NewTeamButton />
          </Suspense>
        </div>
        <p className="text-muted-foreground text-xl">A list of all PWHL teams</p>
      </div>

      <Suspense fallback={<Loader />}>
        <TeamsTableWrapper />
      </Suspense>
    </div>
  )
}

async function NewTeamButton() {
  const arenas = await fetchArenas()
  const showNewButton = await canCreateTeam()

  return showNewButton && <TeamForm arenas={arenas} />
}

async function TeamsTableWrapper() {
  const arenas = await fetchArenas()
  const teams = await fetchTeams()

  const showEditButton = await canUpdateTeam()
  const showDeleteButton = await canDeleteTeam()

  return (
    <TeamsTable teams={teams} arenas={arenas} showEditButton={showEditButton} showDeleteButton={showDeleteButton} />
  )
}

async function fetchTeams() {
  'use cache'
  cacheTag(getTeamGlobalTag())

  const teams = await db
    .select({
      id: TeamTable.id,
      name: TeamTable.name,
      location: ArenaTable.location,
      shortName: TeamTable.shortName,
      primaryArenaId: TeamTable.primaryArenaId,
      arenaName: ArenaTable.name,
    })
    .from(TeamTable)
    .innerJoin(ArenaTable, eq(TeamTable.primaryArenaId, ArenaTable.id))
    .orderBy(TeamTable.location)

  return teams
}

export const metadata: Metadata = {
  title: 'Teams',
  description: 'A list of all teams in the PWHL',
}
