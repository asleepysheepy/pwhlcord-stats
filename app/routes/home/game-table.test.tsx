import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { describe, expect, it } from 'vitest'
import { GameTable } from '~/routes/home/game-table'

const mockGames = [
  {
    id: 1,
    gameDate: new Date('2025-02-01T19:00:00'),
    season: '20252026',
    gameType: 'REGULAR SEASON',
    homeTeamScore: 3,
    awayTeamScore: 2,
    gameLength: 3900,
    messageCount: 1000,
    homeTeamId: 1,
    awayTeamId: 2,
    gameNumber: 1,
    gameLengthFormatted: '65:00',
    yaps: 923,
    scoreline: 'ABC 2 - 3 DEF',
  },
]

const mockTeams = [
  {
    id: 1,
    logo: {
      id: 'abc123',
    },
  },
  {
    id: 2,
    logo: {
      id: 'def456',
    },
  },
]

describe('<GameTable />', () => {
  it('should render an empty state when games list is empty', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: GameTable,
        HydrateFallback: () => null,
        loader: () => ({
          games: [],
          teams: mockTeams,
        }),
      },
    ])

    render(<Stub />)

    const expectedText = 'Unable to find any game data for the selected season.'

    expect(await screen.findByText(expectedText)).toBeInTheDocument()
  })

  it('should render non-sortable table headers', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: GameTable,
        HydrateFallback: () => null,
        loader: () => ({
          games: mockGames,
          teams: mockTeams,
        }),
      },
    ])

    render(<Stub />)

    expect(await screen.findByText('Date')).toBeInTheDocument()
    expect(await screen.findByText('Score')).toBeInTheDocument()
  })

  it('should render sortable table column headers', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: GameTable,
        HydrateFallback: () => null,
        loader: () => ({
          games: mockGames,
          teams: mockTeams,
        }),
      },
    ])

    render(<Stub />)

    expect(await screen.findByText('#')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by game number, descending' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('Game Length')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by game length, descending' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('Messages')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by message count, descending' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('Yaps/60')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by yaps per sixty, descending' }),
    ).toBeInTheDocument()
  })

  it('should render table data', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: GameTable,
        HydrateFallback: () => null,
        loader: () => ({
          games: mockGames,
          teams: mockTeams,
        }),
      },
    ])

    render(<Stub />)

    expect(await screen.findByText('1')).toBeInTheDocument()
    expect(await screen.findByText('Sat, Feb 1, 2025')).toBeInTheDocument()
    expect(await screen.findByText('ABC 2 - 3 DEF')).toBeInTheDocument()
    expect(await screen.findByText('65:00')).toBeInTheDocument()
    expect(await screen.findByText('1000')).toBeInTheDocument()
    expect(await screen.findByText('923')).toBeInTheDocument()
  })
})
