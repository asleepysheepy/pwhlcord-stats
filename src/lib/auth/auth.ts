import 'server-only'

import { betterAuth } from 'better-auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { urlLogin } from '@/lib/urls'
import { betterAuthConfig } from './auth-config'

export const auth = betterAuth(betterAuthConfig)

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session == null) {
    redirect(urlLogin())
  }
}

export async function verifyNoSession(redirectUrl = '/') {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session != null) {
    redirect(redirectUrl)
  }
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session?.user
}
