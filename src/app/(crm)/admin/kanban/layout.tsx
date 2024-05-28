import React from 'react'
import { AdminPageTitle } from '@components/crm/PageTitle'

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminPageTitle title="Kanban" />
      {children}
    </>
  )
}
