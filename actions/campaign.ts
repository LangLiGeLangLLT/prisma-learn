'use server'

import { z } from 'zod'
import { CampaignSchema } from '@/lib/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function findCampaignsWithPosts() {
  return await db.campaign.findMany({
    include: {
      posts: {
        where: {
          publishAt: {
            lt: new Date(),
          },
        },
        select: {
          id: true,
        },
      },
    },
  })
}

export async function createCampaign(values: z.infer<typeof CampaignSchema>) {
  const { success, data, error } = CampaignSchema.safeParse(values)

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

export async function updateCampaign(
  campaignId: string,
  values: z.infer<typeof CampaignSchema>
) {
  const { success, data, error } = CampaignSchema.safeParse(values)

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    }
  }

  const campaign = await db.campaign.update({
    where: {
      id: campaignId,
    },
    data: {
      name: data.name,
      description: data.description,
      updatedAt: new Date(),
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
