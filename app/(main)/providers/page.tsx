import React from 'react'
import CreateProviderDialog from './components/create-provider-dialog'
import { findProviders } from '@/actions/provider'
import ProviderList from './components/provider-list'
import { nanoid } from 'nanoid'

export default async function Page() {
  const providers = await findProviders()

  return (
    <div className="space-y-4">
      <CreateProviderDialog />
      <ProviderList key={nanoid()} providers={providers} />
    </div>
  )
}
