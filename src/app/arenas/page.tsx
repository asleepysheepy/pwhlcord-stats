import { type Metadata } from 'next'
import { Suspense } from 'react'
import { Loader } from '@/components/loader'
import { fetchArenas } from '@/features/arenas/actions'
import { ArenaForm } from '@/features/arenas/components/arena-form'
import { ArenasTable } from '@/features/arenas/components/arenas-table'
import { canCreateArena, canDeleteArena, canUpdateArena } from '@/features/arenas/permissions'

export default function ArenasPage() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-12">
        <div className="flex flex-row justify-between">
          <h1 className="mb-6 text-3xl font-semibold">Arenas</h1>
          <Suspense>
            <NewArenaButton />
          </Suspense>
        </div>
        <p className="text-muted-foreground text-xl">
          A list of all arenas which have hosted, or are scheduled to host, a PWHL game
        </p>
      </div>

      <Suspense fallback={<Loader />}>
        <ArenasTableWrapper />
      </Suspense>
    </div>
  )
}

async function NewArenaButton() {
  const showNewButton = await canCreateArena()

  return showNewButton ? <ArenaForm /> : null
}

async function ArenasTableWrapper() {
  const arenas = await fetchArenas()
  const showEditButton = await canUpdateArena()
  const showDeleteButton = await canDeleteArena()

  return <ArenasTable arenas={arenas} showEditButton={showEditButton} showDeleteButton={showDeleteButton} />
}

export const metadata: Metadata = {
  title: 'Arenas',
  description: 'A list of all arenas which have hosted, or are scheduled to host, a PWHL game',
}
