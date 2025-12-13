import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'default' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
}

export const Large: Story = {
  args: { size: 'lg' },
}

export const Small: Story = {
  args: { size: 'sm' },
}
