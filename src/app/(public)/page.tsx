'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslationsContext } from '@/context/translations-context'
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
  const { translations: t } = useTranslationsContext()

  return (
    <div className={`${companyParams ? 'mt-0' : ''} overflow-x-hidden pb-10`}>
      <div className={`mx-auto lg:px-0`}>
        <Banner title={t.home?.bannerTitle} />
      </div>

      <div className="relative">
        <div id="best-offers" className="absolute -top-[100px] left-0"></div>
        <ItemsCarousel
          buttonTitle={t.home?.bestOffers?.buttonTitle}
          buttonUrl="#"
          title={t.home?.bestOffers?.title}
          items={offers}
          startingLabel={t.home?.startingLabel}
          footerSubtitle={
            <span
              className="text-xs text-[#808080]"
              dangerouslySetInnerHTML={{
                __html: t.home?.bestOffers?.footerSubtitle,
              }}
            ></span>
          }
        />
      </div>
      <div className="custom-container">
        <Offers />
        <section className="mb-14 mt-20 lg:mb-36">
          <WhyUs title={t.home?.whyUs?.title} />
        </section>
      </div>
      <div className="custom-container padding-right-none">
        <BlogList
          title={t.usefulInfo?.title}
          buttonTitle={t.usefulInfo?.buttonLabel}
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
