'use client'

import { deleteProvider, findProviders } from '@/actions/provider'
import { Prisma } from '@prisma/client'
import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import UpdateProviderDialog from './update-provider-dialog'
import { Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export default function ProviderList({
  providers,
}: {
  providers: Prisma.PromiseReturnType<typeof findProviders>
}) {
  function onDeleteProvider(providerId: string) {
    deleteProvider(providerId)
      .then(() => {
        toast({
          title: 'Provider deleted',
          description: 'The provider has been deleted.',
        })
      })
      .catch(() => {
        toast({
          title: 'Failed to delete provider',
          description: 'The provider could not be deleted.',
        })
      })
  }

  return (
    <>
      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{provider.name}</span>
              <div className="space-x-2">
                <UpdateProviderDialog provider={provider} />
                <button
                  onClick={() => {
                    onDeleteProvider(provider.id)
                  }}
                >
                  <Trash2 className="size-4 text-destructive" />
                </button>
              </div>
            </CardTitle>
            <CardDescription>{provider.account}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}
