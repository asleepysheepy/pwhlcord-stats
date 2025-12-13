import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>

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

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Link: Story = {
  args: { variant: 'link' },
}
