'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ViewIcon, ViewOffSlashIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { LoadingSwap } from '@/components/ui/loading-swap'
import { authClient } from '@/lib/auth-client'
import { urlHome } from '@/lib/urls'

const loginFormSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type LoginFormType = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const router = useRouter()

  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleLogin(data: LoginFormType) {
    await authClient.signIn.email(data, {
      onError: ({ error }) => form.setError('root.serverError', error),
      onSuccess: () => {
        router.push(urlHome())
      },
    })
  }

  return (
    <form id="login-form" onSubmit={form.handleSubmit(handleLogin)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
              <Input
                {...field}
                id="login-form-email"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="login-form-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="login-form-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="absolute inset-y-1/2 right-2 size-7 -translate-y-1/2"
                  onClick={() => setPasswordVisible((p) => !p)}
                >
                  <HugeiconsIcon icon={isPasswordVisible ? ViewOffSlashIcon : ViewIcon} className="size-5" />
                  <span className="sr-only">{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {form.formState.errors.root?.serverError && (
        <FieldError errors={[form.formState.errors.root?.serverError]} className="mt-6" />
      )}

      <Button type="submit" size="default" className="mt-8" disabled={form.formState.isSubmitting}>
        <LoadingSwap isLoading={form.formState.isSubmitting}>Log In</LoadingSwap>
      </Button>
    </form>
  )
}
