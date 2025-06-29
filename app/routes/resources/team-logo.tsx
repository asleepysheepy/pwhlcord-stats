import { invariantResponse } from '@epic-web/invariant'

import type { Route } from './+types/team-logo'
import { prisma } from '~/lib/db.server'

export async function loader({ params }: Route.LoaderArgs) {
  invariantResponse(params.imageId, 'Image ID is required', { status: 400 })
  const image = await prisma.teamLogo.findUnique({
    where: { id: params.imageId },
    select: { contentType: true, blob: true },
  })

  invariantResponse(image, 'Not found', { status: 404 })

  return new Response(image.blob, {
    headers: {
      'Content-Type': image.contentType,
      'Content-Length': Buffer.byteLength(image.blob).toString(),
      'Content-Disposition': `inline; filename="${params.imageId}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
