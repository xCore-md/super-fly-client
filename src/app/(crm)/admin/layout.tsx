import React from 'react'
import { CrmHeader } from '@/app/(crm)/admin/crm-header'

export default function CrmLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CrmHeader />
      <main className="container mx-auto p-5 lg:px-0">{children}</main>
    </>
  )
}
