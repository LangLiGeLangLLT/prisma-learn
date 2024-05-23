import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CreateProviderDialog from './components/create-provider-dialog'
import { findProviders } from '@/actions/provider'

export default async function Page() {
  const providers = await findProviders()

  return (
    <div className="space-y-4">
      <CreateProviderDialog />

      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardHeader>
            <CardTitle>{provider.name}</CardTitle>
            <CardDescription>{provider.account}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
