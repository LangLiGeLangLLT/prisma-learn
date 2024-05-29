import React from 'react'
import { findPostsWithProvidersCampaigns } from '@/actions/post'
import PostList from './components/post-list'
import CreatePostDialog from './components/create-post-dialog'
import { findProviders } from '@/actions/provider'
import { findCampaignsWithPosts } from '@/actions/campaign'

export default async function Page() {
  const posts = await findPostsWithProvidersCampaigns()
  const providers = await findProviders()
  const campaigns = await findCampaignsWithPosts()

  return (
    <div className="space-y-4">
      <CreatePostDialog providers={providers} campaigns={campaigns} />
      <PostList posts={posts} />
    </div>
  )
}
