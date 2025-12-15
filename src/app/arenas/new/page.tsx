import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ArenaForm } from '@/features/arenas/components/arena-form'
import { canCreateArena } from '@/features/arenas/permissions'

export default async function NewArenaPage() {
  if (!(await canCreateArena())) {
    redirect('/login')
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-8 text-3xl font-semibold">Create New Arena</h1>
      <ArenaForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Create New Arena',
}
