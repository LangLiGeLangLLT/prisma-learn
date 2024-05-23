import { z } from 'zod'

export const providerSchema = z.object({
  name: z.string().min(1),
  account: z.string().min(1),
})

export const campaignSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})
