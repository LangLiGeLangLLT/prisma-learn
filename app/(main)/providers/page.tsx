import React from 'react'
import db from '@/lib/db'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Page() {
  const providers = await db.provider.findMany()

  return (
    <div className="space-y-4">
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