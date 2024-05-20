import Image from 'next/image'
import banner from '@/assets/img/banner.jpg'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export const Banner = () => {
  return (
    <section className="mb-32 max-[1440px]:px-5 max-[1024px]:px-0 lg:mb-56">
      <div className="max[1024px]:h-[700px] absolute left-0 top-0 z-0 h-[650px] w-full rounded-b-[40px] bg-brand-blue max-[1024px]:h-full">
        <div className="relative h-full w-full">
          <Image
            fill
            className="h-full rounded-b-[50px] object-contain lg:object-cover"
            src={banner}
            alt="banner"
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-2 flex flex-col items-center lg:mb-14">
          <h1 className="mb-8 text-2xl font-medium text-white lg:text-[44px]">
            Începe Călătoria Ta
          </h1>
          <p className="hidden w-[386px] text-center text-sm font-light text-white lg:block">
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
