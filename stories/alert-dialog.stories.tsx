import { PlusSignIcon, BluetoothIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  subcomponents: {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertDialogTrigger render={<Button />}>
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <HugeiconsIcon icon={BluetoothIcon} strokeWidth={2} />
            </AlertDialogMedia>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </>
    ),
  },
}
