import React from 'react'
import { AdminPageTitle } from '@components/crm/PageTitle'
import { SearchBar } from '@components/search-bar'

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminPageTitle title="Căutare" />
      <div className="relative">
        <div className="mb-28 flex justify-center">
          <SearchBar arrival={false} />
        </div>

        {children}
      </div>
    </>
  )
}
