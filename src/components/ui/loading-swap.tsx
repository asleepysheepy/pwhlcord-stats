import { Refresh01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function LoadingSwap({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center">
      <div
        className={cn(
          'col-start-1 col-end-2 row-start-1 row-end-2 w-full',
          isLoading ? 'invisible' : 'visible',
          className,
        )}
      >
        {children}
      </div>
      <div
        className={cn('col-start-1 col-end-2 row-start-1 row-end-2', isLoading ? 'visible' : 'invisible', className)}
      >
        <HugeiconsIcon icon={Refresh01Icon} className="animate-spin" />
      </div>
    </div>
  )
}
