import z from 'zod'

export const arenaSchema = z.object({
  name: z.string(),
  maxCapacity: z.number().int().min(1, 'Required'),
  location: z.string().regex(/.+?\S, [A-Z]{2}/, { error: 'Location must use the format City Name, AA' }),
})
