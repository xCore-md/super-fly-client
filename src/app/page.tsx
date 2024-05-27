import { Banner } from '@/components/banner'
import { BlogList } from '@/components/blog-list'
import { ItemsCarousel } from '@/components/items-carousel'
import { WhyUs } from '@/components/why-us'
import { offers, usefulInfo } from '@/data/data'
import Offers from '@components/offers'
import Questions from '@components/questions'

export default function Home() {
  return (
    <div className="mt-28 overflow-x-hidden pb-10 max-[1024px]:mt-10 lg:overflow-x-auto lg:max-[1440px]:px-5">
      <Banner />
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
  )
}
