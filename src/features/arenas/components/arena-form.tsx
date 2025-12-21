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
import { createArena, updateArena } from '@/features/arenas/actions'
import { arenaSchema } from '@/features/arenas/schema'

type Props = {
  arena?: {
    id: number
    name: string
    maxCapacity: number
    location: string
  }
}

export function ArenaForm({ arena }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isUpdating = !!arena

  const form = useForm<z.infer<typeof arenaSchema>>({
    resolver: zodResolver(arenaSchema),
    defaultValues: {
      name: arena?.name ?? '',
      maxCapacity: arena?.maxCapacity ?? 0,
      location: arena?.location ?? '',
    },
  })

  async function onSubmit(values: z.infer<typeof arenaSchema>) {
    const action = isUpdating ? updateArena.bind(null, arena.id) : createArena

    const { error, message } = await action(values)

    if (error) {
      form.setError('root.serverError', { message })
    } else {
      toast.success(message)
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={<Button variant={isUpdating ? 'outline' : 'default'} size={isUpdating ? 'icon' : 'default'} />}
      >
        <HugeiconsIcon icon={isUpdating ? Edit04Icon : PlusSignIcon} className="size-5" />
        {isUpdating ? <span className="sr-only">Edit {arena.name}</span> : 'New Arena'}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isUpdating ? `Update ${arena?.name}` : 'Create New Arena'}
          </DialogTitle>
        </DialogHeader>
        <form id="arena-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="arena-form-arena-name">Arena Name</FieldLabel>
                  <Input {...field} id="arena-form-arena-name" aria-invalid={fieldState.invalid} type="text" required />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="maxCapacity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="arena-form-arena-max-capacity">Max Capacity</FieldLabel>
                  <Input
                    {...field}
                    id="arena-form-arena-maxCapacity"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    step={1}
                    onChange={(e) => field.onChange(isNaN(e.target.valueAsNumber) ? '' : e.target.valueAsNumber)}
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
                  <FieldLabel htmlFor="arena-form-arena-location">Location</FieldLabel>
                  <Input
                    {...field}
                    id="arena-form-arena-location"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          {form.formState.errors.root?.serverError && (
            <FieldError errors={[form.formState.errors.root?.serverError]} className="mt-6" />
          )}

          <DialogFooter>
            <div className="mt-8 flex flex-row gap-4">
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                <LoadingSwap isLoading={form.formState.isSubmitting}>
                  {isUpdating ? 'Update' : 'Create'} Arena
                </LoadingSwap>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
