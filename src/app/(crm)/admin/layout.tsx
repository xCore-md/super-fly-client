import Image from 'next/image'
import React from 'react'
import { CrmHeader } from '@/app/(crm)/admin/crm-header'
import plane from '@/assets/img/plane.png'
export default function CrmLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CrmHeader />

      <main className="container mx-auto p-5 lg:px-0">
        <SearchHeader />
        <div className="relative">{children}</div>
      </main>
    </>
  )
}
const SearchHeader = () => {
  return (
    <section className="max-[1440px]:px-5 max-[1024px]:px-0">
      <div className="absolute left-0 top-0 z-0 h-full w-full bg-brand-blue lg:h-[322px]">
        <div className="relative h-full w-full">
          <Image
            fill
            className="banner-image opacity-1 h-full object-cover"
            src={plane}
            alt="'plane"
            priority
          />
        </div>
      </div>
    </section>
  )
}
