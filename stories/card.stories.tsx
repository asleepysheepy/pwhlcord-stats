import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const meta = {
  title: 'UI/Card',
  component: Card,
  subcomponents: { CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle },
  args: { className: 'relative w-full max-w-sm overflow-hidden pt-0' },
  decorators: [
    (Story) => (
      <div className="mx-auto grid min-h-screen w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 md:grid-cols-2 md:gap-8 lg:p-12 2xl:max-w-6xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <div className="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural language. Monitoring will no longer be
            available on the Pro plan in November, 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          Switch to the improved way to explore your data, with natural language. Monitoring will no longer be available
          on the Pro plan in November, 2025
        </CardContent>
        <CardFooter>Observability Plus is replacing Monitoring</CardFooter>
      </>
    ),
  },
}
