import { eq } from 'drizzle-orm'
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { ArenaTable } from '@/db/schema'
import { ArenaForm } from '@/features/arenas/components/arena-form'
import { canUpdateArena } from '@/features/arenas/permissions'
import { urlLogin } from '@/lib/urls'

type Props = {
  params: Promise<{ arenaId: string }>
}

export default async function ArenaEditPage({ params }: Props) {
  if (!(await canUpdateArena())) {
    redirect(urlLogin())
  }

  const { arenaId } = await params
  const arena = await fetchArena(parseInt(arenaId))

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-8 text-3xl font-semibold">Edit Arena</h1>
      <ArenaForm arena={arena} />
    </div>
  )
}

async function fetchArena(arenaId: number) {
  const [arena] = await db
    .select({
      id: ArenaTable.id,
      name: ArenaTable.name,
      maxCapacity: ArenaTable.maxCapacity,
      location: ArenaTable.location,
    })
    .from(ArenaTable)
    .where(eq(ArenaTable.id, arenaId))

  return arena
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { arenaId } = await params
  const arena = await fetchArena(parseInt(arenaId))

  return {
    title: `Edit ${arena.name}`,
  }
}
