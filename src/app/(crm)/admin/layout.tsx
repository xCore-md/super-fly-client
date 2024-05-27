import React from 'react'

export default function CrmLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="container mx-auto p-5 lg:px-0">{children}</main>
    </>
  )
}
