'use client'

import { offers, usefulInfo } from '@/data/data'
import { Banner } from '@components/banner'
import { BlogList } from '@components/blog-list'
import { ItemsCarousel } from '@components/items-carousel'
import Offers from '@components/offers'
import Questions from '@components/questions'
import { WhyUs } from '@components/why-us'

import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const companyParams = searchParams.get('company')

  return (
    <div
      className={`${companyParams ? 'mt-0' : ''} overflow-x-hidden pb-10 lg:overflow-x-auto`}
    >
      <div className={`mx-auto lg:px-0`}>
        <Banner />
      </div>
      <ItemsCarousel
        buttonTitle="Vezi Toate Ofertele"
        buttonUrl="#"
        title="Cele mai bune oferte"
        items={offers}
        footerSubtitle={
          <span className="text-xs text-[#808080]">
            Începeți călătoria bilete de avion low cost de la Superfly. <br />{' '}
            Alegeți destinația preferată și începeți să explorați lumea astăzi!
          </span>
        }
      />
      <div className="container mx-auto p-5 lg:px-0">
        <Offers />
        <section className="mb-14 mt-20 lg:mb-36">
          <WhyUs title="Rezervați cu noi" />
        </section>
      </div>
      <div className="py-5 pl-5 lg:px-5">
        <BlogList
          title="Informație utilă"
          subtitle="Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium pellentesque tincidunt quam"
          buttonTitle="Vezi Toate"
          buttonUrl="/blog"
          items={usefulInfo}
        />
      </div>

      <div className="container mx-auto p-5 lg:px-0">
        <Questions />
      </div>
    </div>
  )
}
