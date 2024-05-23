'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'
import { deleteCampaign, findCampaignsWithPosts } from '@/actions/campaign'
import { Prisma } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import UpdateCampaignDialog from './update-campaign-dialog'

export default function CampaignList({
  campaigns,
}: {
  campaigns: Prisma.PromiseReturnType<typeof findCampaignsWithPosts>
}) {
  function onDeleteCampaign(campaignId: string) {
    deleteCampaign(campaignId).then(() => {
      toast({
        title: 'Campaign deleted',
        description: 'The campaign has been deleted.',
      })
    })
  }

  return (
    <>
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{campaign.name}</span>
              <div className="space-x-2">
                <UpdateCampaignDialog campaign={campaign} />
                <button onClick={() => onDeleteCampaign(campaign.id)}>
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </CardTitle>
            <CardDescription>{campaign.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">
              {campaign.posts.length} Post Scheduled
            </Badge>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
