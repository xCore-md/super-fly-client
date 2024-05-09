import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import aboutBanner from '@/assets/img/about-banner.png'
import fourteen from '@/assets/img/fourteen.svg'
import hundred from '@/assets/img/hundred.svg'
import people from '@/assets/img/people.jpg'
import thirteen from '@/assets/img/thirteen.svg'
import { WhyUs } from '@/components/why-us'

export default function About() {
  return (
    <div className="mt-4 pb-20">
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

      <section className=" my-[60px]">
        <WhyUs title="6 Motive să rezervați cu noi!" />
      </section>
      <hr className="  border-t-gray-200" />

      <div className="mt-[60px]">
        <div className="mb-14 flex flex-col items-center">
          <h3 className="mb-2 text-2xl font-normal">Succesele noastre</h3>
          <p className="text-md text-center font-light text-gray-700">
            Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
            pellentesque tincidunt quam
          </p>
        </div>
        <div className="flex gap-6">
          <div className="w-1/3">
            <div className="mb-4 rounded-lg border border-brand-gray bg-white px-6 pb-8 pt-6">
              <h3 className="mb-2 text-xl font-normal">
                Realizările noastre împreună cu voi
              </h3>
              <p className="text-md text-justify font-normal text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Mattis pretium
                pellentesque tincidunt quam. Lorem ipsum dolor sit amet
                consectetur.
              </p>
            </div>
            <Image src={people} alt="image" />
            <Link
              href="#"
              className="mt-6 flex h-11 items-center justify-center rounded-full bg-blue-700 px-8 font-light text-white shadow-md shadow-slate-400"
            >
              <span>Rezervă acum</span>
            </Link>
          </div>
          <div className="w-2/3">
            <ul className="flex flex-col gap-6">
              <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                <div className="flex items-center gap-4">
                  <div className="relative h-[69px] w-[230px]">
                    <Image fill src={fourteen} alt="icon" />
                  </div>
                  <p className="text-md ml-2 font-normal">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, animi voluptate quo sed vitae perferendis error
                    cum doloribus id? Omnis iste, ratione libero voluptatibus
                    nostrum tempore deleniti quidem iure temporibus.
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                <div className="flex items-center gap-4">
                  <div className="relative h-[69px] w-[230px]">
                    <Image fill src={thirteen} alt="icon" />
                  </div>
                  <p className="text-md ml-2 font-normal">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, animi voluptate quo sed vitae perferendis error
                    cum doloribus id? Omnis iste, ratione libero voluptatibus
                    nostrum tempore deleniti quidem iure temporibus.
                  </p>
                </div>
              </li>
              <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                <div className="flex items-center gap-4">
                  <div className="relative h-[69px] w-[230px]">
                    <Image fill src={hundred} alt="icon" />
                  </div>
                  <p className="text-md ml-2 font-normal">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, animi voluptate quo sed vitae perferendis error
                    cum doloribus id? Omnis iste, ratione libero voluptatibus
                    nostrum tempore deleniti quidem iure temporibus.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
