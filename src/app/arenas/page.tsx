import { countDistinct, eq } from 'drizzle-orm'
import { type Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { db } from '@/db'
import { ArenaTable, GameTable } from '@/db/schema'
import { getArenaGlobalTag } from '@/features/arenas/cache'
import { ArenaForm } from '@/features/arenas/components/arena-form'
import { ArenasTable } from '@/features/arenas/components/arenas-table'
import { canCreateArena, canDeleteArena, canUpdateArena } from '@/features/arenas/permissions'

export default async function ArenasPage() {
  const arenas = await fetchArenas()
  const showNewButton = await canCreateArena()
  const showEditButton = await canUpdateArena()
  const showDeleteButton = await canDeleteArena()

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-12">
        <div className="flex flex-row justify-between">
          <h1 className="mb-6 text-3xl font-semibold">Arenas</h1>
          {showNewButton && <ArenaForm />}
        </div>
        <p className="text-muted-foreground text-xl">
          A list of all arenas which have hosted, or are scheduled to host, a PWHL game
        </p>
      </div>

      <ArenasTable arenas={arenas} showEditButton={showEditButton} showDeleteButton={showDeleteButton} />
    </div>
  )
}

async function fetchArenas() {
  'use cache'
  cacheTag(getArenaGlobalTag())

  await new Promise((resolve) => setTimeout(resolve, 9000))

  const arenas = await db
    .select({
      id: ArenaTable.id,
      name: ArenaTable.name,
      maxCapacity: ArenaTable.maxCapacity,
      location: ArenaTable.location,
      gamesHosted: countDistinct(GameTable),
    })
    .from(ArenaTable)
    .leftJoin(GameTable, eq(GameTable.arenaId, ArenaTable.id))
    .orderBy(ArenaTable.name)
    .groupBy(ArenaTable.id)

  return arenas
}

export const metadata: Metadata = {
  title: 'Arenas',
  description: 'A list of all arenas which have hosted, or are scheduled to host, a PWHL game',
}
