import Image from 'next/image'
import blogBanner from '@/assets/img/blog-banner.jpg'
import blogFooter from '@/assets/img/blog-footer.png'
import blogImage from '@/assets/img/blog-image.jpg'
import { Button } from '@/components/ui/button'

export default function SingleBlog() {
  return (
    <section>
      <Header />
      <div className="container mx-auto px-0 pb-36 pt-80 text-gray-600 lg:pt-[600px]">
        <div>
          <p className="mb-6">
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur. Mattis
            pretium pellentesque tincidunt quam. Lorem ipsum dolor sit amet
            consectetur. Mattis pretium pellentesque tincidunt quam. Lorem ipsum
            dolor sit amet consectetur. Mattis pretium pellentesque tincidunt
            quam. Lorem ipsum dolor sit amet consectetur. Mattis pretium
            pellentesque tincidunt quam.
          </p>
        </div>
        <div className="my-9 flex flex-col items-start gap-10 lg:flex-row">
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
        </div>
        <p className="mb-9">
          Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
          tincidunt quam.
        </p>
        <p>Lorem ipsum dolor.</p>

        <div className="relative mt-16 flex h-full flex-col items-center justify-center px-6 py-8 lg:h-[254px] lg:px-0 lg:py-0">
          <Image
            className="absolute left-0 top-0 z-0 h-full w-full rounded-[40px] object-cover"
            src={blogFooter}
            alt="image"
          />
          <div className="z-10 flex flex-col items-center justify-center text-white">
            <h4 className="mb-3 text-lg lg:text-2xl">Nu rata ocazia</h4>
            <span className="mb-11 px-10 text-center text-sm font-light lg:px-0 lg:text-base">
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

const Header = () => {
  return (
    <div className="absolute left-0 top-[80px] z-0 block h-72 w-full rounded-b-[50px] ">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full object-cover lg:h-auto"
        src={blogBanner}
        alt="banner-image"
      />
      <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <p className="px-9 pt-0 text-center text-base text-white lg:pt-32 lg:text-3xl lg:leading-10">
          Lorem ipsum dolor sit amet consectetur. Mattis <br /> pretium
          pellentesque tincidunt quam.
        </p>
      </div>
    </div>
  )
}
