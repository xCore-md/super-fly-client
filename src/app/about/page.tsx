import Image from 'next/image'
import React from 'react'
import aboutBanner from '@/assets/img/about-banner.png'
import { WhyUs } from '@/components/why-us'

export default function About() {
  return (
    <div className="mt-4 pb-10">
      <Header />
      <div className="mb-8 mt-20 flex justify-center">
        <div className="mb-14 flex w-[1000px] flex-col  items-center">
          <h3 className="mb-6 text-2xl font-medium">Despre noi</h3>
          <p className="text-md mb-6 text-center font-light text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur. Mattis
            pretium pellentesque tincidunt quam. Lorem ipsum dolor sit amet
            consectetur. Lorem ipsum dolor sit amet consectetur. Mattis pretium
            pellentesque tincidunt quam. Lorem ipsum dolor sit amet consectetur.
            Mattis pretium pellentesque tincidunt quam. Lorem ipsum dolor sit
            amet consectetur.
          </p>
          <p className="text-md text-center font-light text-gray-700">
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur. Mattis
            pretium pellentesque tincidunt quam. Lorem ipsum dolor sit amet
            consectetur. Lorem ipsum dolor sit amet consectetur. Mattis pretium
            pellentesque tincidunt quam.
          </p>
        </div>
      </div>

      <Image className="rounded-[20px]" src={aboutBanner} alt="image" />

      <WhyUs />
      <hr className="  border-t-gray-200" />
    </div>
  )
}

const Header = () => {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 h-64 w-full"></div>
    </>
  )
}
