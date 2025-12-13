import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Input>

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
