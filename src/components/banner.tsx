import Image from 'next/image'
import banner from '@/assets/img/banner.jpg'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export const Banner = () => {
  return (
    <section className="mb-56 max-[1440px]:px-5">
      <div className="absolute left-0 top-0 z-0 h-[650px] w-full">
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
        <div className="mb-14 flex flex-col items-center justify-center max-[768px]:mb-8">
          <h1 className="mb-4 text-[44px] font-medium text-white max-[768px]:text-xl">
            Începe Călătoria Ta
          </h1>
          <p className="w-[386px] text-center text-sm font-light text-white max-[768px]:hidden">
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
