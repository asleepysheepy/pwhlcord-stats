import 'dotenv/config'

import { db } from '@/db'
import { ArenaTable, TeamTable } from '@/db/schema'

import arenaData from './arenas.json'
import teamData from './teams.json'

async function initData() {
  await db.delete(TeamTable)
  await db.delete(ArenaTable)

  await db.insert(ArenaTable).values(arenaData)
  await db.insert(TeamTable).values(teamData)
}

initData().catch((e) => console.error(e))
