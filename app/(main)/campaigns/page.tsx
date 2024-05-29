import React from 'react'
import CreateCampaignDialog from './components/create-campaign-dialog'
import CampaignList from './components/campaign-list'
import { findCampaignsWithPosts } from '@/actions/campaign'
import { nanoid } from 'nanoid'

export default async function Page() {
  const campaigns = await findCampaignsWithPosts()

  return (
    <div className="space-y-4">
      <CreateCampaignDialog />
      <CampaignList key={nanoid()} campaigns={campaigns} />
    </div>
  )
}
