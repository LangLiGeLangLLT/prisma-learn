'use server'

import db from '@/lib/db'
import { PostSchema } from '@/lib/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function findPostsWithProvidersCampaigns() {
  return await db.post.findMany({
    include: {
      provider: true,
      campaigns: true,
    },
  })
}

export async function createPost(values: z.infer<typeof PostSchema>) {
  const { success, data, error } = PostSchema.safeParse(values)

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    }
  }

  const post = await db.post.create({
    data: {
      body: data.body,
      publishAt: data.publishAt,
      provider: {
        connect: {
          id: data.providerId,
        },
      },
      campaigns: {
        connect: data.campaignIds.map((campaignId) => ({
          id: campaignId,
        })),
      },
    },
    include: {
      provider: true,
      campaigns: true,
    },
  })

  revalidatePath('/schedule')

  return {
    data: post,
  }
}

export async function updatePost() {}

export async function deletePost() {}
