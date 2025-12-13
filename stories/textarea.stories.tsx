import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Field, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-72">
        <Field>
          <FieldLabel htmlFor="small-form-role">Role</FieldLabel>
          <Story />
        </Field>
      </div>
    ),
  ],
}
