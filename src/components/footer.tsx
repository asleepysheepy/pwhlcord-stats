import { DiscordIcon, Github01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { Separator } from './ui/separator'

export function Footer() {
  return (
    <>
      <Separator />
      <footer className="text-muted-foreground my-2 flex items-center justify-between p-3 text-xs">
        <p>&copy; {new Date().getFullYear()} kt (a_sleepy_sheepy)</p>

        <div className="flex gap-3">
          <Link href="https://github.com/asleepysheepy/pwhlcord-stats">
            <HugeiconsIcon icon={Github01Icon} className="size-5" />
            <span className="sr-only">Check out the Github</span>
          </Link>
          <Link href="https://discord.gg/pwhl">
            <HugeiconsIcon icon={DiscordIcon} className="size-5" />
            <span className="sr-only">Join the Discord</span>
          </Link>
        </div>
      </footer>
    </>
  )
}
