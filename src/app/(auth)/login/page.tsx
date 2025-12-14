import { type Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { verifyNoSession } from '@/lib/auth'
import { LoginForm } from './components/login-form'

export default async function LoginPage() {
  await verifyNoSession()

  return (
    <Card className="mx-auto max-w-sm">
      <CardTitle>
        <CardHeader>
          <h1 className="text-3xl font-semibold">Log In</h1>
        </CardHeader>
      </CardTitle>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Log in',
  description: 'The log in page',
}
