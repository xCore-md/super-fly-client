import { Banner } from '@/components/banner'
import { BlogList } from '@/components/blog-list'
import dynamic from 'next/dynamic'

const Offers = dynamic(() => import('@components/offers'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Home() {
  return (
    <div className="pb-10">
      <Banner />
      <BlogList />
      <Offers />
    </div>
  )
}
