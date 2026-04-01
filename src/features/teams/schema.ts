import { z } from 'zod'

export const teamSchema = z.object({
  location: z.string({
    error: (i) => (i.input == null ? 'Location is required' : 'Location must be a string'),
  }),
  name: z.string({
    error: (i) => (i.input == null ? 'Team Name is required' : 'Team Name must be a string'),
  }),
  shortName: z
    .string({
      error: (i) => (i.input == null ? 'Short Name is required' : 'Short Name must be a string'),
    })
    .length(3, { error: 'Short Name must be three letters' })
    .toUpperCase(),
  primaryArenaId: z.int({ error: 'Primary Arena is required' }),
})
