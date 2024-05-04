import Image from 'next/image'
import { Button } from '@/components/ui/button'
import banner from '@/assets/img/banner.jpg'
import { SearchBar } from './search-bar'
import { SearchBarWithTabs } from '@components/search-bar-with-tabs'

export const Banner = () => {
  return (
    <section className="mb-56">
      <Image
        className="absolute top-0 left-0 w-full z-0 rounded-b-[50px]"
        src={banner}
        alt="banner"
      />

      <div className="relative z-10">
        <div className="flex flex-col justify-center items-center mb-14">
          <h1 className="text-[44px] font-medium mb-4 text-white">
            Începe Călătoria Ta
          </h1>
          <p className="text-sm text-center w-[386px] font-light text-white">
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
