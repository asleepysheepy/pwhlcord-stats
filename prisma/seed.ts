import fs from 'node:fs'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type TeamData = { id: number; location: string; name: string; shortName: string }
const teamData: TeamData[] = [
  { id: 1, location: 'Boston', name: 'Fleet', shortName: 'BOS' },
  { id: 2, location: 'Minnesota', name: 'Frost', shortName: 'MIN' },
  { id: 3, location: 'Montréal', name: 'Victoire', shortName: 'MTL' },
  { id: 4, location: 'New York', name: 'Sirens', shortName: 'NYS' },
  { id: 5, location: 'Ottawa', name: 'Charge', shortName: 'OTT' },
  { id: 6, location: 'Toronto', name: 'Sceptres', shortName: 'TOR' },
  { id: 7, location: 'Vancouver', name: 'Vans', shortName: 'VAN' },
  { id: 8, location: 'Seattle', name: 'Seas', shortName: 'SEA' },
]

async function img(filepath: string, current: boolean, altText?: string) {
  return {
    altText,
    current,
    contentType: filepath.endsWith('.png') ? 'image/png' : 'image/jpeg',
    blob: await fs.promises.readFile(`./prisma/seed_data/${filepath}`),
  }
}

async function createTeams() {
  console.time('👥 Creating teams...')
  await Promise.all(
    teamData.map(async (team) => {
      const logo = await img(
        `team_logos/${team.shortName.toLowerCase()}.png`,
        true,
        `${team.location}'s logo`,
      )

      return prisma.team.create({ data: { ...team, teamLogos: { create: logo } } })
    }),
  )
  console.timeEnd('👥 Creating teams...')
}

async function createGamesForSeason(season: string, teams: TeamData[], gamesPerTeam: number) {
  for (const homeTeam of teams) {
    for (const awayTeam of teams) {
      if (homeTeam.id === awayTeam.id) {
        continue
      }

      for (let i = 0; i < gamesPerTeam; i++) {
        // Set game date
        const startDate = `${season.slice(0, 4)}-11-15`
        const endDate = `${season.slice(4, 8)}-04-30`
        const gameDate = faker.date.between({ from: startDate, to: endDate })

        // Set game length
        let gameLength
        const wasOvertime = faker.number.int({ min: 1, max: 4 }) === 1 // 25% chance of the game going to OT
        const wasShootout = wasOvertime && faker.number.int({ min: 1, max: 5 }) === 1 // 20% chance of an overtime game going to shootout
        if (wasShootout) {
          gameLength = 3900
        } else if (wasOvertime) {
          gameLength = faker.number.int({ min: 3601, max: 3899 })
        } else {
          gameLength = 3600
        }

        // Set Score
        let awayTeamScore
        const winningTeam = faker.number.binary() === '1' ? 'home' : 'away'
        const homeTeamScore = faker.number.int({ min: 2, max: 6 })
        const scoreDiff = wasOvertime || wasShootout ? 1 : 2
        if (winningTeam === 'home') {
          awayTeamScore = homeTeamScore - scoreDiff
        } else {
          awayTeamScore = homeTeamScore + scoreDiff
        }

        // Generate messages count
        const messageCount = faker.number.int({ min: 100, max: 3000 })

        const gameData = {
          season,
          gameDate,
          gameType: 'REGULAR_SEASON',
          homeTeamScore,
          awayTeamScore,
          gameLength,
          messageCount,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
        }

        await prisma.game.create({ data: gameData })
      }
    }
  }
}

async function seed() {
  console.log('🌱 Seeding...')
  console.time(`🌱 Database has been seeded`)

  console.time('🧹 Cleaned up the database...')
  await prisma.game.deleteMany()
  await prisma.teamLogo.deleteMany()
  await prisma.team.deleteMany()
  console.timeEnd('🧹 Cleaned up the database...')

  await createTeams()

  console.time('🏒 Creating games...')
  await createGamesForSeason('20232024', teamData.slice(0, 6), 2)
  await createGamesForSeason('20242025', teamData.slice(0, 6), 3)
  await createGamesForSeason('20252026', teamData, 2)
  console.timeEnd('🏒 Creating games...')

  console.timeEnd(`🌱 Database has been seeded`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
