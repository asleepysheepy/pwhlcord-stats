import 'dotenv/config'

import { db } from '@/db'
import { ArenaTable } from '@/db/schema'
import { arenaSchema } from '@/features/arenas/schema'

import arenaData from './arenas.json'

async function createArenas() {
  // Reset Arenas Table
  await db.delete(ArenaTable)

  // Ensure arenas data is valid before attempting to insert it into the database
  const arenas = arenaData.map((arena) => arenaSchema.parse(arena))
  await db.insert(ArenaTable).values(arenas)
}

async function initData() {
  await createArenas()
}

initData().catch((e) => console.error(e))
