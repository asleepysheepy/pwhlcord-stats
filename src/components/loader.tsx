import { Refresh01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function Loader() {
  return (
    <div className="mx-auto mt-8 flex max-w-sm flex-col items-center justify-center gap-8">
      <p className="text-xl font-semibold">Loading...</p>
      <HugeiconsIcon icon={Refresh01Icon} className="text-primary size-12 animate-spin" />
    </div>
  )
}
