'use server'

import { z } from 'zod'
import { ProviderSchema } from '@/lib/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function findProviders() {
  return await db.provider.findMany()
}

export async function createProvider(values: z.infer<typeof ProviderSchema>) {
  const { success, data, error } = ProviderSchema.safeParse(values)

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    }
  }

  const provider = await db.provider.create({
    data: {
      name: data.name,
      account: data.account,
    },
  })

  revalidatePath('/providers')

  return {
    data: provider,
  }
}

export async function updateProvider(
  providerId: string,
  values: z.infer<typeof ProviderSchema>
) {
  const { success, data, error } = ProviderSchema.safeParse(values)

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    }
  }

  const provider = await db.provider.update({
    where: {
      id: providerId,
    },
    data: {
      name: data.name,
      account: data.account,
      updatedAt: new Date(),
    },
  })

  revalidatePath('/providers')

  return {
    data: provider,
  }
}

export async function deleteProvider(providerId: string) {
  const provider = await db.provider.delete({
    where: {
      id: providerId,
    },
  })

  revalidatePath('/providers')

  return {
    data: provider,
  }
}
