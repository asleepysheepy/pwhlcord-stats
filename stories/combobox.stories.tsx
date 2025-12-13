import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { Field, FieldLabel } from '@/components/ui/field'

const meta = {
  title: 'UI/Combobox',
  component: Combobox,
  subcomponents: { ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList },
  parameters: {
    layout: 'centered',
  },
  args: {
    items: ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'],
  },
  decorators: [
    (Story) => (
      <Field>
        <FieldLabel htmlFor="small-form-framework">Framework</FieldLabel>
        <Story />
      </Field>
    ),
  ],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <ComboboxInput id="small-form-framework" placeholder="Select a framework" required />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </>
    ),
  },
}
