import Image from 'next/image'
import banner from '@/assets/img/banner.jpg'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export const Banner = () => {
  return (
    <section className="mb-56">
      <Image
        className="absolute left-0 top-0 z-0 w-full rounded-b-[50px]"
        src={banner}
        alt="banner"
      />

      <div className="relative z-10">
        <div className="mb-14 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-[44px] font-medium text-white">
            Începe Călătoria Ta
          </h1>
          <p className="w-[386px] text-center text-sm font-light text-white">
            Lorem ipsum dolor sit amet consectetur. Interdum non ultrices tortor
            faucibus dis eget. Urna porttitor eget tincidunt sagittis est ac
            aliquet.
          </p>
        </div>

        <SearchBarWithTabs />
      </div>
    </section>
  )
}
