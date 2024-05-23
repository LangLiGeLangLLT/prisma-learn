'use server'

import { z } from 'zod'
import { campaignSchema } from '@/lib/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function findCampaignsWithPosts() {
  return await db.campaign.findMany({
    include: {
      posts: {
        where: {
          publishAt: {
            gt: new Date(),
          },
        },
        select: {
          id: true,
        },
      },
    },
  })
}

export async function createCampaign(values: z.infer<typeof campaignSchema>) {
  const { success, data, error } = campaignSchema.safeParse(values)

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    }
  }

  const campaign = await db.campaign.create({
    data: {
      name: data.name,
      description: data.description,
    },
  })

  revalidatePath('/campaigns')

  return {
    data: campaign,
  }
}

export async function deleteCampaign(campaignId: string) {
  const campaign = await db.campaign.delete({
    where: {
      id: campaignId,
    },
  })

  revalidatePath('/campaigns')

  return {
    data: campaign,
  }
}
