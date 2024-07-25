'use client'

import React from 'react'

export default function TicketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const pathname = usePathname()

  return (
    <>
      <main className="bg-white p-5">
        <div className="relative">{children}</div>
      </main>
    </>
  )
}
