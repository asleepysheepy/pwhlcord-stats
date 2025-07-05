import { CaretDownIcon, CaretUpIcon, CaretSortIcon } from '@radix-ui/react-icons'
import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSortableTable } from '~/hooks/useSortableTable'

vi.mock('@radix-ui/react-icons', () => ({
  CaretDownIcon: vi.fn(),
  CaretUpIcon: vi.fn(),
  CaretSortIcon: vi.fn(),
}))

type mockSortOptions = 'key1' | 'key2'

describe('useSortableTable', () => {
  beforeEach(() => {
    vi.mocked(CaretDownIcon).mockImplementation(() => <span data-testid="mock-down-icon" />)
    vi.mocked(CaretUpIcon).mockImplementation(() => <span data-testid="mock-up-icon" />)
    vi.mocked(CaretSortIcon).mockImplementation(() => <span data-testid="mock-sort-icon" />)
  })

  it('should return the sort property and direction and render function', () => {
    const { result } = renderHook(() =>
      useSortableTable<mockSortOptions>({
        initialSortDirection: 'asc',
        initialSortBy: 'key1',
      }),
    )

    expect(result.current.sortDir).toBe('asc')
    expect(result.current.sortBy).toBe('key1')
    expect(result.current.renderSortButton).toBeDefined()
  })

  describe('renderSortButton', () => {
    it('should render with the correct icon when not the active sort column', () => {
      const { result } = renderHook(() =>
        useSortableTable<mockSortOptions>({
          initialSortDirection: 'asc',
          initialSortBy: 'key2',
        }),
      )
      render(result.current.renderSortButton('key1', 'key1'))
      screen.getByTestId('mock-sort-icon')
    })

    it('should set sortBy on click when not the active sort column', async () => {
      const user = userEvent.setup()
      const { result } = renderHook(() =>
        useSortableTable<mockSortOptions>({
          initialSortDirection: 'asc',
          initialSortBy: 'key2',
        }),
      )

      render(result.current.renderSortButton('key1', 'key1'))
      await user.click(screen.getByRole('button', { name: 'Sort by key1, descending' }))

      expect(result.current.sortBy).toBe('key1')
    })

    it('should render with the correct icon when active sort column and ascending', () => {
      const { result } = renderHook(() =>
        useSortableTable<mockSortOptions>({
          initialSortDirection: 'asc',
          initialSortBy: 'key1',
        }),
      )
      render(result.current.renderSortButton('key1', 'key1'))
      screen.getByTestId('mock-down-icon')
    })

    it('should set sortDir to desc on click when when active sort column and ascending', async () => {
      const user = userEvent.setup()
      const { result } = renderHook(() =>
        useSortableTable<mockSortOptions>({
          initialSortDirection: 'asc',
          initialSortBy: 'key1',
        }),
      )

      render(result.current.renderSortButton('key1', 'key1'))
      await user.click(screen.getByRole('button', { name: 'Sort by key1, descending' }))

      expect(result.current.sortDir).toBe('desc')
    })

    it('should render with the correct icon when active sort column and descending', () => {
      const { result } = renderHook(() =>
        useSortableTable<mockSortOptions>({
          initialSortDirection: 'desc',
          initialSortBy: 'key1',
        }),
      )
      render(result.current.renderSortButton('key1', `key1`))
      screen.getByTestId('mock-up-icon')
    })

    it('should set sortDir to asc on click when when active sort column and descending', async () => {
      const user = userEvent.setup()
      const { result } = renderHook(() =>
        useSortableTable<mockSortOptions>({
          initialSortDirection: 'desc',
          initialSortBy: 'key1',
        }),
      )

      render(result.current.renderSortButton('key1', 'key1'))
      await user.click(screen.getByRole('button', { name: 'Sort by key1, ascending' }))

      expect(result.current.sortDir).toBe('asc')
    })
  })
})
