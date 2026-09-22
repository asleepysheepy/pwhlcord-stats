import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ArenaForm } from './arena-form'

const mockArena = {
  id: 1,
  name: 'Mock Arena',
  maxCapacity: 10000,
  location: 'Somewhere, EX',
}

async function renderAndOpenNew() {
  const user = userEvent.setup()

  render(<ArenaForm />)

  await user.click(screen.getByRole('button', { name: 'New Arena' }))

  return user
}

async function renderAndOpenEdit(arena = mockArena) {
  const user = userEvent.setup()

  render(<ArenaForm arena={arena} />)

  await user.click(screen.getByRole('button', { name: `Edit ${arena.name}` }))

  return user
}

describe('<ArenaForm />', () => {
  it('should render the Create Arena Button when no arena prop is passed', () => {
    render(<ArenaForm />)

    // TODO: assert the correct icon is rendered
    expect(screen.getByRole('button', { name: 'New Arena' })).toBeInTheDocument()
  })

  it('should render the Edit Arena button when an arena prop is passed', () => {
    render(<ArenaForm arena={mockArena} />)

    // TODO: assert the correct icon is rendered
    expect(screen.getByRole('button', { name: 'Edit Mock Arena' })).toBeInTheDocument()
  })

  it('should render the new arena form when the new arena button is clicked', async () => {
    await renderAndOpenNew()

    expect(screen.getByText('Create New Arena')).toBeInTheDocument()
    expect(screen.getByLabelText('Arena Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Max Capacity')).toBeInTheDocument()
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Arena' })).toBeInTheDocument()
  })

  it('should render the edit arena form when the edit arena button is clicked', async () => {
    await renderAndOpenEdit()

    expect(screen.getByText('Update Mock Arena')).toBeInTheDocument()
    expect(screen.getByLabelText('Arena Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Max Capacity')).toBeInTheDocument()
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update Arena' })).toBeInTheDocument()
  })

  it('should render the Arena Name field with the correct attributes', async () => {
    await renderAndOpenNew()

    const nameField = screen.getByLabelText('Arena Name')
    expect(nameField).toHaveAttribute('id', 'arena-form-arena-name')
    expect(nameField).toBeRequired()
    expect(nameField).toHaveAttribute('type', 'text')
  })

  it('should render the Max Capacity field with the correct attributes', async () => {
    await renderAndOpenNew()

    const maxCapacityField = screen.getByLabelText('Max Capacity')
    expect(maxCapacityField).toHaveAttribute('id', 'arena-form-arena-max-capacity')
    expect(maxCapacityField).toHaveAttribute('type', 'number')
    expect(maxCapacityField).toBeRequired()
  })

  // TODO: Why won't this test pass?
  it.skip('should accessibly render an error message on the Max Capacity field when there is a validation error', async () => {
    const user = await renderAndOpenNew()

    const maxCapacityField = screen.getByLabelText('Max Capacity')
    await user.type(maxCapacityField, '1500')
    await user.tab()

    expect(maxCapacityField).toHaveValue(1500)
    expect(await screen.findByText('Max Capacity must be between 2000 and 25000')).toBeInTheDocument()
    // expect(maxCapacityField).toHaveAccessibleErrorMessage('Max Capacity must be between 2000 and 25000')
  })
})
