import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { findPostsWithProvidersCampaigns } from '@/actions/post'

export default async function Page() {
  const posts = await findPostsWithProvidersCampaigns()

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.id}</CardTitle>
            <CardDescription>{JSON.stringify(post)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>Start: {post.publishAt.toLocaleString()}</div>
            <div>End: {post.publishAt.toLocaleString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
