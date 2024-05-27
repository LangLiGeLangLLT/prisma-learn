import { findPostsWithProvidersCampaigns } from '@/actions/post'
import { Prisma } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PostList({
  posts,
}: {
  posts: Prisma.PromiseReturnType<typeof findPostsWithProvidersCampaigns>
}) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.id}</CardTitle>
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
