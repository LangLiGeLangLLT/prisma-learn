'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navigation = [
  { title: 'Providers', href: '/providers' },
  { title: 'Campaign', href: '/campaigns' },
  { title: 'Schedule', href: '/schedule' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background shadow h-12">
        <ul className="container flex items-center h-full space-x-8">
          {navigation.map((nav) => (
            <li key={nav.title} className="h-full relative">
              <Link
                className={cn(
                  'font-medium h-full flex items-center',
                  pathname === nav.href &&
                    'after:absolute after:bg-foreground after:h-0.5 after:bottom-0 after:left-0 after:w-full after:block'
                )}
                href={nav.href}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <main className="flex-1">
        <div className="container my-5">{children}</div>
      </main>

      <footer className="h-10 flex justify-center items-center bg-foreground/5">
        {new Date().getFullYear()}
      </footer>
    </div>
  )
}
