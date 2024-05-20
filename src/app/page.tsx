import dynamic from 'next/dynamic'
import { Banner } from '@/components/banner'
import { BlogList } from '@/components/blog-list'
import { WhyUs } from '@/components/why-us'

const Offers = dynamic(() => import('@components/offers'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const Questions = dynamic(() => import('@components/questions'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Home() {
  return (
    <div className="mt-28 pb-10 max-[1024px]:mt-10 lg:max-[1440px]:px-5">
      <Banner />
      <BlogList
        title="Cele mai bune oferte"
        footerSubtitle={
          <span>
            Începeți călătoria bilete de avion low cost de la Superfly. <br />{' '}
            Alegeți destinația preferată și începeți să explorați lumea astăzi!
          </span>
        }
        buttonTitle="Vezi Toate Ofertele"
        withDestinationsAndPrices
      />
      <Offers />
      <section className="mb-14 mt-20 lg:mb-36">
        <WhyUs title="Rezervați cu noi" />
      </section>
      <BlogList
        title="Informație utilă"
        subtitle="Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium pellentesque tincidunt quam"
        buttonTitle="Vezi Toate"
      />
      <Questions />
    </div>
  )
}
