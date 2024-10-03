'use client'

import { offers, usefulInfo } from '@/data/data'
import { Banner } from '@components/banner'
import { BlogList } from '@components/blog-list'
import { ItemsCarousel } from '@components/items-carousel'
import Offers from '@components/offers'
import Questions from '@components/questions'
import { WhyUs } from '@components/why-us'

export default function Home() {
  const params = Object.fromEntries(new URLSearchParams(window.location.search))

  const isCompanyExist = params.hasOwnProperty('company')

  return (
    <div
      className={`${isCompanyExist ? 'mt-0' : 'mt-4'} overflow-x-hidden pb-10 md:mt-28 lg:overflow-x-auto lg:max-[1440px]:px-5`}
    >
      <div
        className={`container mx-auto lg:px-0 ${isCompanyExist ? 'px-5 py-3' : 'p-5'}`}
      >
        <Banner />
      </div>
      <ItemsCarousel
        buttonTitle="Vezi Toate Ofertele"
        buttonUrl="#"
        title="Cele mai bune oferte"
        items={offers}
        footerSubtitle={
          <span>
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
        <BlogList
          title="Informație utilă"
          subtitle="Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium pellentesque tincidunt quam"
          buttonTitle="Vezi Toate"
          buttonUrl="/blog"
          items={usefulInfo}
        />
        <Questions />
      </div>
    </div>
  )
}
