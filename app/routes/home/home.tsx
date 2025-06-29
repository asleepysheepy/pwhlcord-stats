import type { Route } from '../../../.react-router/types/app/routes/+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PWHLCord Stats' },
    { name: 'description', content: 'Meta Stats for the unofficial PWHL Discord' },
  ]
}

export default function Home() {
  return <main />
}
