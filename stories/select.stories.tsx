import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const meta = {
  title: 'UI/Select',
  component: Select,
  subcomponents: { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue },
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Select>

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
  args: {
    items: [
      { label: 'Developer', value: 'developer' },
      { label: 'Designer', value: 'designer' },
      { label: 'Manager', value: 'manager' },
      { label: 'Other', value: 'other' },
    ],
    children: (
      <Select>
        <SelectTrigger id="small-form-role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key="developer" value="developer">
              Developer
            </SelectItem>
            <SelectItem key="designer" value="designer">
              Designer
            </SelectItem>
            <SelectItem key="manager" value="manager">
              Manager
            </SelectItem>
            <SelectItem key="other" value="other">
              Other
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
}
