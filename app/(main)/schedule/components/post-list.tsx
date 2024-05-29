'use client'

import { deletePost, findPostsWithProvidersCampaigns } from '@/actions/post'
import { Prisma } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { findProviders } from '@/actions/provider'
import { findCampaignsWithPosts } from '@/actions/campaign'
import UpdatePostDialog from './update-post-dialog'

export default function PostList({
  posts,
  providers,
  campaigns,
}: {
  posts: Prisma.PromiseReturnType<typeof findPostsWithProvidersCampaigns>
  providers: Prisma.PromiseReturnType<typeof findProviders>
  campaigns: Prisma.PromiseReturnType<typeof findCampaignsWithPosts>
}) {
  function onDeletePost(postId: string) {
    deletePost(postId)
      .then(() => {
        toast({
          title: 'Post deleted',
          description: 'The post was deleted successfully.',
        })
      })
      .catch(() => {
        toast({
          title: 'Failed to delete post',
          description: 'The post could not be deleted.',
        })
      })
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{post.id}</span>
              <div className="space-x-2">
                <UpdatePostDialog
                  post={post}
                  providers={providers}
                  campaigns={campaigns}
                />
                <button onClick={() => onDeletePost(post.id)}>
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 divide-y">
            <div>{post.body}</div>

            <div className="space-y-2">
              <div className="text-3xl">Post</div>
              <Card>
                <CardHeader>
                  <CardTitle>{post.provider?.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{post.provider?.name}</div>
                  <div>{post.provider?.account}</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <div className="text-3xl">Campaigns</div>
              {post.campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <CardTitle>{campaign.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>{campaign.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
