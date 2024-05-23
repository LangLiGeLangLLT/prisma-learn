'use server'

import db from '@/lib/db'

export async function findPostsWithProvidersCampaigns() {
  return await db.post.findMany({
    include: {
      provider: true,
      campaigns: true,
    },
  })
}
