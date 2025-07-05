import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router'

export function Footer() {
  return (
    <footer className="text-muted-foreground mx-auto my-8 flex max-w-3xl items-center justify-between text-sm">
      <p>&copy; {new Date().getFullYear()} a_sleepy_sheepy</p>

      <div className="flex gap-3">
        <Link to="https://github.com/asleepysheepy/pwhlcord-stats">
          <GitHubLogoIcon className="size-6" />
          <span className="sr-only">Check out the Github</span>
        </Link>
        <Link to="https://discord.gg/pwhl">
          <DiscordLogoIcon className="size-6" />
          <span className="sr-only">Join the Discord</span>
        </Link>
      </div>
    </footer>
  )
}
