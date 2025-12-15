import 'server-only'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    autoSignIn: false,
    minPasswordLength: 8,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [nextCookies()],
})

export async function verifySession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session == null) {
    redirect('/login')
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
