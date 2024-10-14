'use client'

import Image, { StaticImageData } from 'next/image'
import { usePathname } from 'next/navigation'
// import blogBanner from '@/assets/img/blog-banner.jpg'
import { useEffect, useState } from 'react'
import blogFooter from '@/assets/img/blog-footer.png'
// import blogImage from '@/assets/img/blog-image.jpg'
import { usefulInfo } from '@/data/data'
import { getLastSegment } from '@/lib/utils'
import { Button } from '@components/ui/button'

interface IProps {
  title: string
  text: string
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
      <Header img={data.img} title={data.title} />
      <div className="custom-container px-0 pb-36 pt-6 lg:pt-[76px]">
        <div>
          <p
            className="mb-6 text-sm leading-6 text-[#323232] lg:text-[18px]"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></p>
          {/* <p>
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur. Mattis
            pretium pellentesque tincidunt quam. Lorem ipsum dolor sit amet
            consectetur. Mattis pretium pellentesque tincidunt quam. Lorem ipsum
            dolor sit amet consectetur. Mattis pretium pellentesque tincidunt
            quam. Lorem ipsum dolor sit amet consectetur. Mattis pretium
            pellentesque tincidunt quam.
          </p> */}
        </div>
        {/* <div className="my-9 flex flex-col items-start gap-10 lg:flex-row">
          <Image src={blogImage} alt="image" />
          <div>
            <h4 className="mb-4">
              Lorem ipsum dolor sit amet consectetur. Mattis pretium
              pellentesque tincidunt quam.{' '}
            </h4>
            <ul className=" ml-6 flex flex-col gap-6">
              <li>
                <span className="mr-4">1.</span>Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Asperiores voluptatum mollitia
                vitae distinctio. Vel pariatur delectus cumque aliquid. Dolor
                exercitationem minima expedita, perferendis illum dolore
                cupiditate quos! Nostrum, a qui.
              </li>
              <li>
                <span className="mr-4">2.</span>Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Asperiores voluptatum mollitia
                vitae distinctio. Vel pariatur delectus cumque aliquid. Dolor
                exercitationem minima expedita, perferendis illum dolore
                cupiditate quos! Nostrum, a qui.
              </li>
              <li>
                <span className="mr-4">3.</span>Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Asperiores voluptatum mollitia
                vitae distinctio. Vel pariatur delectus cumque aliquid. Dolor
                exercitationem minima expedita, perferendis illum dolore
                cupiditate quos! Nostrum, a qui.
              </li>
            </ul>
          </div>
        </div> */}
        {/* <p className="mb-9">
          Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
          tincidunt quam.
        </p>
        <p>Lorem ipsum dolor.</p> */}

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
        <p className="text-center text-base uppercase tracking-wider text-white lg:text-4xl lg:leading-10">
          {title}
        </p>
      </div>
    </div>
  )
}
