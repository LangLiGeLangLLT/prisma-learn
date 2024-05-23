import React from 'react'
import db from '@/lib/db'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Page() {
  const posts = await db.post.findMany({
    include: {
      provider: true,
      campaigns: true,
    },
  })

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
