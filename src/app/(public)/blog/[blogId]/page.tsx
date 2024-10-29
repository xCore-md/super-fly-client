'use client'

import Image, { StaticImageData } from 'next/image'
import { usePathname } from 'next/navigation'
// import blogBanner from '@/assets/img/blog-banner.jpg'
import { useEffect, useState, ReactElement } from 'react'
import blogFooter from '@/assets/img/blog-footer.png'
// import blogImage from '@/assets/img/blog-image.jpg'
import { usefulInfo } from '@/data/data'
import { getLastSegment } from '@/lib/utils'
import { Button } from '@components/ui/button'

interface IProps {
  header: string
  title: string
  shortText: string
  content: ReactElement
  img: StaticImageData
}

export default function SingleBlog() {
  const pathname = usePathname()
  const [data, setData] = useState({} as IProps)

  useEffect(() => {
    if (pathname) {
      setData(usefulInfo[getLastSegment(pathname)])
    }
  }, [pathname])

  return (
    <section>
      <Header img={data.img} title={data.header} />
      <div className="custom-container px-0 pb-36 pt-6 lg:pt-[76px]">
        <div>
          <p className="content-fields mb-6 text-sm leading-6 text-[#323232] lg:text-[18px]">
            {data.content}
          </p>
        </div>

        <div className="relative mt-16 flex h-full flex-col items-center justify-center px-6 py-8 lg:h-[254px] lg:px-0 lg:py-0">
          <Image
            className="absolute left-0 top-0 z-0 h-full w-full rounded-[40px] object-cover"
            src={blogFooter}
            alt="image"
          />
          <div className="z-10 flex flex-col items-center justify-center text-white">
            <h4 className="mb-3 text-lg lg:text-2xl">Nu rata ocazia</h4>
            <span className="mb-11 px-10 text-center text-sm font-light lg:px-0 lg:text-[18px]">
              Descoperă acum Oferte de Top, și rezervă rapid bilete la cel mai
              bun preț!
            </span>
            <Button className="flex h-11 w-full items-center justify-center rounded-full bg-brand-blue px-8 text-base font-light text-white lg:w-[460px] ">
              Mergi la Oferte de Top
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const Header = ({ img, title }: any) => {
  return (
    <div className="relative h-[400px] w-full">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full rounded-b-[30px] object-cover "
        src={img}
        alt="banner-image"
      />
      <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <p className="text-center text-base uppercase tracking-wider text-white drop-shadow-md lg:text-4xl lg:leading-10">
          {title}
        </p>
      </div>
    </div>
  )
}
