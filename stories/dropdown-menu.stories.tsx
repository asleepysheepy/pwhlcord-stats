import {
  MoreVerticalCircle01Icon,
  FileIcon,
  FolderIcon,
  EyeIcon,
  LayoutIcon,
  PaintBoardIcon,
  SunIcon,
  MoonIcon,
  ComputerIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  KeyboardIcon,
  LanguageCircleIcon,
  NotificationIcon,
  MailIcon,
  ShieldIcon,
  LogoutIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta = {
  title: 'UI/Dropdown',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Button variant={'ghost'}>
        <Story />
      </Button>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} />
          <span className="sr-only">More options</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>File</DropdownMenuLabel>
            <DropdownMenuItem>
              <HugeiconsIcon icon={FileIcon} strokeWidth={2} />
              New File
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={FolderIcon} strokeWidth={2} />
              New Folder
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={true} onCheckedChange={fn()}>
              <HugeiconsIcon icon={EyeIcon} strokeWidth={2} />
              Show Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={false} onCheckedChange={fn()}>
              <HugeiconsIcon icon={LayoutIcon} strokeWidth={2} />
              Show Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={'system'} onValueChange={fn()}>
                      <DropdownMenuRadioItem value="light">
                        <HugeiconsIcon icon={SunIcon} strokeWidth={2} />
                        Light
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark">
                        <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
                        Dark
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="system">
                        <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
                        System
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
              Billing
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={KeyboardIcon} strokeWidth={2} />
                      Keyboard Shortcuts
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={LanguageCircleIcon} strokeWidth={2} />
                      Language
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <HugeiconsIcon icon={NotificationIcon} strokeWidth={2} />
                        Notifications
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Notification Types</DropdownMenuLabel>
                            <DropdownMenuCheckboxItem checked={false} onCheckedChange={fn()}>
                              <HugeiconsIcon icon={NotificationIcon} strokeWidth={2} />
                              Push Notifications
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={true} onCheckedChange={fn()}>
                              <HugeiconsIcon icon={MailIcon} strokeWidth={2} />
                              Email Notifications
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={ShieldIcon} strokeWidth={2} />
                      Privacy & Security
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
              Sign Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </>
    ),
  },
}
