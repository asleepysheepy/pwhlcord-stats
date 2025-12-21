import { Refresh01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function Loading() {
  return (
    <div className="mx-auto mt-8 flex max-w-sm flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-semibold">Loading...</h1>
      <HugeiconsIcon icon={Refresh01Icon} className="text-primary size-12 animate-spin" />
    </div>
  )
}
