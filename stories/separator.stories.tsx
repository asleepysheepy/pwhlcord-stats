import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: { className: 'my-4' },
  decorators: [
    (Story) => (
      <div>
        <div className="space-y-1">
          <h4 className="text-sm leading-none font-medium">Top Item</h4>
          <p className="text-muted-foreground text-sm">Just some nonsense on the top</p>
        </div>
        <Story />
        <div className="space-y-1">
          <h4 className="text-sm leading-none font-medium">Bottom Item</h4>
          <p className="text-muted-foreground text-sm">Just some nonsense on the bottom</p>
        </div>
      </div>
    ),
  ],
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Left</div>
        <Story />
        <div>Centre</div>
        <Story />
        <div>Right</div>
      </div>
    ),
  ],
}
