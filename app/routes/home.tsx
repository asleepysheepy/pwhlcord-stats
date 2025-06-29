import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PWHLCord Stats' },
    { name: 'description', content: 'Meta Stats for the unofficial PWHL Discord' },
  ]
}

export default function Home() {
  return <main />
}
