'use client'

import { useSearchParams } from 'next/navigation'
import { offers, usefulInfo } from '@/data/data'
import { Banner } from '@components/banner'
import { BlogList } from '@components/blog-list'
import { ItemsCarousel } from '@components/items-carousel'
import Offers from '@components/offers'
import Questions from '@components/questions'
import { WhyUs } from '@components/why-us'

export default function Home() {
  const searchParams = useSearchParams()
  const companyParams = searchParams.get('company')

  return (
    <div className={`${companyParams ? 'mt-0' : ''} overflow-x-hidden pb-10`}>
      <div className={`mx-auto lg:px-0`}>
        <Banner />
      </div>

      <div className="relative">
        <div id="best-offers" className="absolute -top-[100px] left-0"></div>
        <ItemsCarousel
          buttonTitle="Vezi Toate Ofertele"
          buttonUrl="#"
          title="Cele mai bune oferte"
          items={offers}
          footerSubtitle={
            <span className="text-xs text-[#808080]">
              Începeți călătoria bilete de avion low cost de la Superfly. <br />{' '}
              Alegeți destinația preferată și începeți să explorați lumea
              astăzi!
            </span>
          }
        />
      </div>
      <div className="custom-container">
        <Offers />
        <section className="mb-14 mt-20 lg:mb-36">
          <WhyUs title="Rezervați cu noi" />
        </section>
      </div>
      <div className="custom-container padding-right-none">
        <BlogList
          title="Informație utilă"
          buttonTitle="Vezi Toate"
          buttonUrl="/blog"
          items={usefulInfo}
        />
      </div>
      <div className="custom-container">
        <Questions />
      </div>
    </div>
  )
}
