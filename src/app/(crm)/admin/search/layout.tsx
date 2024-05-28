import Image from 'next/image'
import React from 'react'
import plane from '@/assets/img/plane.png'
import { SearchBar } from '@components/search-bar'

export default function CrmLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-8 pb-10 max-[1024px]:mt-10 lg:max-[1440px]:px-5">
      <SearchHeader />

      <div className="relative">
        <div className="mb-20 flex justify-center">
          <SearchBar arrival={false} />
        </div>

        {children}
      </div>
    </div>
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
      <div className="relative z-10 p-1.5">
        <h4 className="banner-title mb-8 text-2xl font-light text-white">
          Căutare
        </h4>
      </div>
    </section>
  )
}
