import { Banner } from '@/components/banner'
import { BlogList } from '@/components/blog-list'
import { WhyUs } from '@/components/why-us'
import dynamic from 'next/dynamic'

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
    <div className="pb-10 mt-20">
      <Banner />
      <BlogList
        title="Cele mai bune oferte"
        footerSubtitle="Obțineți economii mari la zboruri și pachete de vacanță cu
            promoțiile noastre exclusive. <br /> Răsfoiți cele mai recente
            oferte și rezervați-vă astăzi următoarea călătorie!"
        buttonTitle="Vezi Toate Ofertele"
      />
      <Offers />
      <WhyUs />
      <BlogList
        title="Informație utilă"
        subtitle="Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium pellentesque tincidunt quam"
        buttonTitle="Vezi Toate"
      />
      <Questions />
    </div>
  )
}
