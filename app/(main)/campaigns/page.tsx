import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
import db from '@/lib/db'
import { Badge } from '@/components/ui/badge'

export default async function Page() {
  const campaigns = await db.campaign.findMany({
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

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>{campaign.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">
              {campaign.posts.length} Post Scheduled
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
