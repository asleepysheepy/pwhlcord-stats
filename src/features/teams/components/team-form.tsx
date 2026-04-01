'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Edit04Icon, PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { LoadingSwap } from '@/components/ui/loading-swap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createTeam, updateTeam } from '../actions'
import { teamSchema } from '../schema'

type Props = {
  team?: {
    id: number
    location: string
    name: string
    shortName: string
    primaryArenaId: number
  }
  arenas: {
    name: string
    id: number
  }[]
}

export function TeamForm({ team, arenas }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isUpdating = !!team

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      location: team?.location ?? '',
      name: team?.name ?? '',
      shortName: team?.shortName ?? '',
      primaryArenaId: team?.primaryArenaId,
    },
  })

  async function onSubmit(values: z.infer<typeof teamSchema>) {
    const { error, message } = isUpdating ? await updateTeam(team.id, values) : await createTeam(values)

    if (error) {
      form.setError('root.serverError', { message })
    } else {
      toast.success(message)
      setIsDialogOpen(false)
    }
  }

  const arenaSelectItems = arenas.map(({ id, name }) => ({ label: name, value: id }))

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={<Button variant={isUpdating ? 'outline' : 'default'} size={isUpdating ? 'icon' : 'default'} />}
      >
        <HugeiconsIcon icon={isUpdating ? Edit04Icon : PlusSignIcon} className="size-5" />
        {isUpdating ? <span className="sr-only">Edit {team.name}</span> : 'New Team'}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isUpdating ? `Update ${team.name}` : 'Create New Team'}
          </DialogTitle>
        </DialogHeader>
        <form id="team-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="team-form-team-name">Team Name</FieldLabel>
                  <Input {...field} id="team-form-team-name" aria-invalid={fieldState.invalid} type="text" required />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="shortName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="team-form-team-short-name">Short Name</FieldLabel>
                  <Input
                    {...field}
                    id="team-form-team-short-name"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="team-form-team-location">Location</FieldLabel>
                  <Input
                    {...field}
                    id="team-form-team-location"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="primaryArenaId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="team-form-team-primary-arena">Primary Arena</FieldLabel>
                  <Select {...field} items={arenaSelectItems} onValueChange={field.onChange}>
                    <SelectTrigger id="team-form-team-primary-arena">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {arenaSelectItems.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <div className="mt-8 flex flex-row gap-4">
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                <LoadingSwap isLoading={form.formState.isSubmitting}>
                  {isUpdating ? 'Update' : 'Create'} Team
                </LoadingSwap>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
