import 'dotenv/config'

import { betterAuth } from 'better-auth'
import { db } from '@/db'
import { ArenaTable, TeamTable } from '@/db/schema'
import { betterAuthConfig } from '@/lib/auth/auth-config'

import arenaData from './arenas.json'
import teamData from './teams.json'

async function createUser(name: string, email: string, password: string) {
  const auth = betterAuth(betterAuthConfig)
  await auth.api.signUpEmail({ body: { name, email, password } })
}

async function initData() {
  await db.delete(TeamTable)
  await db.delete(ArenaTable)

  await db.insert(ArenaTable).values(arenaData)
  await db.insert(TeamTable).values(teamData)

  await createUser('Admin', 'admin@example.com', 'password')
}

initData().catch((e) => console.error(e))
