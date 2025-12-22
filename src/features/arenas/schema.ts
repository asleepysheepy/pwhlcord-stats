import z from 'zod'

const rangeMessage = 'Max Capacity must be between 2000 and 25000'

export const arenaSchema = z.object({
  name: z.string({
    error: (i) => (i.input == null ? 'Arena Name is required' : 'Arena Name must be a string'),
  }),
  maxCapacity: z
    .int({
      error: (i) => (i.input == null ? 'Max Capacity is required' : 'Max Capacity must be a whole number'),
    })
    .min(2000, rangeMessage)
    .max(25000, rangeMessage),
  location: z
    .string({
      error: (i) => (i.input == null ? 'Location is required' : 'Location must be a string'),
    })
    .regex(/.+?\S, [A-Z]{2}/, { error: 'Location must use the format City Name, AA' }),
})
