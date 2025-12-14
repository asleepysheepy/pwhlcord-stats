'use client'

import { WaterfallUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'

export function Navbar() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  function handleLogout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        },
      },
    })
  }

  return (
    <header className="py-6">
      <nav className="flex w-full flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
        <Link href="/" className="flex flex-row items-end gap-2">
          <HugeiconsIcon icon={WaterfallUp01Icon} className="text-primary size-10" />
          <div className="group grid leading-snug">
            <span className="text-muted-foreground font-light transition">PWHLCord</span>
            <span className="text-foreground font-medium transition">Stats</span>
          </div>
        </Link>

        {session && (
          <div>
            <Button variant="ghost" onClick={handleLogout}>
              {session.user.name}
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
