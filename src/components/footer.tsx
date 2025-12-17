import { DiscordIcon, Github01Icon, Key01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { urlLogin } from '@/lib/urls'
import { Separator } from './ui/separator'

const footerLinks = [
  { url: urlLogin(), icon: Key01Icon, label: 'Admin Login' },
  { url: 'https://github.com/asleepysheepy/pwhlcord-stats', icon: Github01Icon, label: 'Check out the Github' },
  { url: 'https://discord.gg/pwhl', icon: DiscordIcon, label: 'Join the Discord' },
]

export function Footer() {
  return (
    <>
      <Separator />
      <footer className="text-muted-foreground my-2 flex items-center justify-between p-3 text-xs">
        <p>&copy; {getCurrentYear()} kt (a_sleepy_sheepy)</p>

        <div className="flex gap-3">
          {footerLinks.map(({ url, icon, label }) => (
            <Link href={url} key={label}>
              <HugeiconsIcon icon={icon} className="size-5" />
              <span className="sr-only">{label}</span>
            </Link>
          ))}
        </div>
      </footer>
    </>
  )
}

async function getCurrentYear() {
  'use cache'
  return new Date().getFullYear()
}
