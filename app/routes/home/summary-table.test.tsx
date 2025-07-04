import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SummaryTable } from '~/routes/home/summary-table'

const mockAggregateDatum = {
  id: 1,
  logo: {
    id: 'abc123',
  },
  location: 'Test City',
  count: 2,
  average: 500,
  sum: 100,
  yaps: 495,
}

describe('<SummaryTable />', () => {
  it('should render an empty state when games list is empty', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: SummaryTable,
        HydrateFallback: () => null,
        loader: () => ({
          aggregateData: [],
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
        Component: SummaryTable,
        HydrateFallback: () => null,
        loader: () => ({
          aggregateData: [mockAggregateDatum],
        }),
      },
    ])

    render(<Stub />)

    expect(await screen.findByText('#')).toBeInTheDocument()
    expect(await screen.findByText('Team')).toBeInTheDocument()
    expect(await screen.findByText('Games')).toBeInTheDocument()
  })

  it('should render sortable table column headers', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: SummaryTable,
        HydrateFallback: () => null,
        loader: () => ({
          aggregateData: [mockAggregateDatum],
        }),
      },
    ])

    render(<Stub />)

    expect(await screen.findByText('Average')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by average messages, descending' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('Total')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by total messages, descending' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('Yaps/60')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Sort by yaps per sixty, ascending' }),
    ).toBeInTheDocument()
  })

  it('should render table data', async () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: SummaryTable,
        HydrateFallback: () => null,
        loader: () => ({
          aggregateData: [mockAggregateDatum],
        }),
      },
    ])

    render(<Stub />)

    expect(await screen.findByText('1')).toBeInTheDocument()
    expect(await screen.findByText('Test City')).toBeInTheDocument()
    expect(await screen.findByText('2')).toBeInTheDocument()
    expect(await screen.findByText('100')).toBeInTheDocument()
    expect(await screen.findByText('495')).toBeInTheDocument()
  })
})
