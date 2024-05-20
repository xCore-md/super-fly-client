import Image from 'next/image'
import banner from '@/assets/img/banner.jpg'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export const Banner = () => {
  return (
    <section className="mb-56 max-[1440px]:px-5">
      <div className="absolute left-0 top-0 z-0 h-[650px] w-full bg-brand-blue">
        <div className="relative h-full w-full">
          <Image
            fill
            objectFit="cover"
            className="rounded-b-[50px]"
            src={banner}
            alt="banner"
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-14 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-xl font-medium text-white lg:text-[44px]">
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
