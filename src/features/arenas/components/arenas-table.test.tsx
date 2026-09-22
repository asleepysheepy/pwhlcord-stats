import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DeleteWithConfirmation } from '@/components/delete-with-confirmation'
import { deleteArena } from '@/features/arenas/actions'
import { ArenasTable } from './arenas-table'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

vi.mock(import('@/components/delete-with-confirmation'), () => ({
  DeleteWithConfirmation: vi.fn(),
}))

vi.mock(import('@/features/arenas/actions'), () => ({
  deleteArena: vi.fn(),
}))

const mockArenas = [
  {
    id: 1,
    name: 'Mock 1',
    maxCapacity: 15000,
    location: 'Somewhere, EX',
    gamesHosted: 40,
  },
  {
    id: 2,
    name: 'Mock 2',
    maxCapacity: 17500,
    location: 'Nowhere, EX',
    gamesHosted: 2,
  },
]

describe('<ArenasTable />', () => {
  beforeEach(() => {
    vi.mocked(deleteArena).mockResolvedValue({ error: false, message: 'success message' })
    vi.mocked(DeleteWithConfirmation).mockImplementation(({ entityName, onClick }) => (
      <button onClick={onClick}>{`Delete ${entityName}`}</button>
    ))
  })

  it('should render the table headers', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.getByText(/Arena/)).toBeInTheDocument()
    expect(screen.getByText(/Capacity/).innerHTML).toEqual('Max<br>Capacity')
    expect(screen.getByText(/Hosted/).innerHTML).toEqual('Games<br>Hosted')
  })

  it('should render the arena name', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.getByText('Mock 1')).toBeInTheDocument()
    expect(screen.getByText('Mock 2')).toBeInTheDocument()
  })

  it('should render the arena location', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.getByText('Somewhere, EX')).toBeInTheDocument()
    expect(screen.getByText('Nowhere, EX')).toBeInTheDocument()
  })

  it('should render the arena capacity', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.getByText('15000')).toBeInTheDocument()
    expect(screen.getByText('17500')).toBeInTheDocument()
  })

  it('should render the arena games hosted', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.getByText('40')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should not show edit button when showEditButton is false', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.queryByText('Actions')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Edit Mock 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Edit Mock 2' })).not.toBeInTheDocument()
  })

  it('should show edit button when showEditButton is true', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={true} showDeleteButton={false} />)

    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Mock 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Mock 2' })).toBeInTheDocument()
  })

  it('should not show edit button when showEditButton is false', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={false} />)

    expect(screen.queryByText('Actions')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete Mock 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete Mock 2' })).not.toBeInTheDocument()
  })

  it('should show edit button when showEditButton is true', () => {
    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={true} />)

    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete Mock 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete Mock 2' })).toBeInTheDocument()
  })

  it('should call deleteArena action when delete button is clicked', async () => {
    const user = userEvent.setup()

    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={true} />)

    await user.click(screen.getByRole('button', { name: 'Delete Mock 1' }))

    expect(deleteArena).toHaveBeenCalledExactlyOnceWith(1)
  })

  it('should dispatch a success toast after successful deletion', async () => {
    const user = userEvent.setup()

    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={true} />)

    await user.click(screen.getByRole('button', { name: 'Delete Mock 1' }))

    expect(toast.success).toHaveBeenCalledExactlyOnceWith('success message')
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('should dispatch an error toast after error in deletion', async () => {
    vi.mocked(deleteArena).mockResolvedValue({ error: true, message: 'error message' })
    const user = userEvent.setup()

    render(<ArenasTable arenas={mockArenas} showEditButton={false} showDeleteButton={true} />)

    await user.click(screen.getByRole('button', { name: 'Delete Mock 1' }))

    expect(toast.error).toHaveBeenCalledExactlyOnceWith('error message')
    expect(toast.success).not.toHaveBeenCalled()
  })
})
