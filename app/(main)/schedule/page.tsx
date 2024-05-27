import React from 'react'
import { findPostsWithProvidersCampaigns } from '@/actions/post'
import PostList from './components/post-list'
import CreatePostDialog from './components/create-post-dialog'

export default async function Page() {
  const posts = await findPostsWithProvidersCampaigns()

  return (
    <div className="space-y-4">
      <CreatePostDialog />
      <PostList posts={posts} />
    </div>
  )
}
