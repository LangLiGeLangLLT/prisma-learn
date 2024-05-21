import Link from 'next/link'
import React from 'react'

const navigation = [
  { title: 'Home', href: '/' },
  { title: 'Providers', href: '/providers' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background shadow h-12">
        <ul className="container flex items-center h-full space-x-8">
          {navigation.map((nav) => (
            <li key={nav.title}>
              <Link className="font-medium" href={nav.href}>
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <main className="flex-1">
        <div className="container mt-5">{children}</div>
      </main>

      <footer className="h-10 flex justify-center items-center bg-foreground/5">
        {new Date().getFullYear()}
      </footer>
    </div>
  )
}
