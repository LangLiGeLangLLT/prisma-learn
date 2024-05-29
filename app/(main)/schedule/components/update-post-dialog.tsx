'use client'

import { findCampaignsWithPosts } from '@/actions/campaign'
import { findPostsWithProvidersCampaigns, updatePost } from '@/actions/post'
import { findProviders } from '@/actions/provider'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { PostSchema } from '@/lib/schema'
import { Flatten, cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Pencil } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UpdatePostDialog({
  post,
  providers,
  campaigns,
}: {
  post: Flatten<
    Prisma.PromiseReturnType<typeof findPostsWithProvidersCampaigns>
  >
  providers: Prisma.PromiseReturnType<typeof findProviders>
  campaigns: Prisma.PromiseReturnType<typeof findCampaignsWithPosts>
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      body: post.body,
      publishAt: post.publishAt,
      providerId: post.provider?.id,
      campaignIds: post.campaigns.map((campaign) => campaign.id),
    },
  })

  function onSubmit(values: z.infer<typeof PostSchema>) {
    startTransition(() => {
      updatePost(post.id, values)
        .then(({ errors }) => {
          if (errors) {
            throw new Error('Something went wrong.')
          }

          setIsOpen(false)
          toast({
            title: 'Success',
            description: 'Updated successfully.',
          })
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error.message,
          })
        })
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <button>
          <Pencil className="mr-2 size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="providerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..."></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="campaignIds"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Campaigns</FormLabel>
                  </div>
                  {campaigns.map((campaign) => (
                    <FormField
                      key={campaign.id}
                      control={form.control}
                      name="campaignIds"
                      render={({ field }) => (
                        <FormItem
                          key={campaign.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(campaign.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      campaign.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== campaign.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {campaign.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Input..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Post Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                Submit
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
