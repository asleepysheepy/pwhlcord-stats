'use client'

import {
  ComputerIcon,
  LogoutIcon,
  MoonIcon,
  PaintBoardIcon,
  Settings01Icon,
  SunIcon,
  UserIcon,
  WaterfallUp01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Navbar() {
  const { data: session } = authClient.useSession()

  return (
    <header className="py-6">
      <nav className="flex w-full flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
        <Link href="/" className="flex flex-row items-end gap-2">
          <HugeiconsIcon icon={WaterfallUp01Icon} className="text-primary size-10" />
          <div className="group grid leading-snug">
            <span className="text-muted-foreground font-light">PWHLCord</span>
            <span className="text-foreground font-medium">Stats</span>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
            <HugeiconsIcon icon={session ? UserIcon : Settings01Icon} className="size-6" />
            <span className="sr-only">{session ? 'Account menu' : 'Site Settings'}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>{session ? <UserDropdown /> : <AnonymousDropdown />}</DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}

function UserDropdown() {
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
    <DropdownMenuGroup>
      <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
      <ThemePicker />
      <DropdownMenuItem variant="destructive" onClick={handleLogout}>
        <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}

function AnonymousDropdown() {
  return (
    <DropdownMenuGroup>
      <ThemePicker />
    </DropdownMenuGroup>
  )
}

function ThemePicker() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="light">
                <HugeiconsIcon icon={SunIcon} strokeWidth={2} />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">
                <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
