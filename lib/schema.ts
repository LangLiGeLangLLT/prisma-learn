import { z } from 'zod'

export const ProviderSchema = z.object({
  name: z.string().min(1),
  account: z.string().min(1),
})

export const CampaignSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

export const PostSchema = z.object({
  body: z.string().min(1),
  publishAt: z.date(),
  providerId: z.string().min(1),
  campaignIds: z.array(z.string().min(1)).min(1),
})
