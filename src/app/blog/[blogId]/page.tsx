import Image from 'next/image'
import blogBanner from '@/assets/img/blog-banner.jpg'
import blogFooter from '@/assets/img/blog-footer.png'
import blogImage from '@/assets/img/blog-image.jpg'
import { Button } from '@/components/ui/button'

export default function SingleBlog() {
  return (
    <section>
      <Header />
      <div className="container mx-auto px-0 pb-36 pt-[600px] text-gray-600">
        <div>
          <p className="mb-6 ">
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
        <div className="my-9 flex items-start gap-10">
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

        <div className="relative mt-16 flex h-[254px] flex-col items-center justify-center">
          <Image
            className="absolute left-0 top-0 z-0"
            src={blogFooter}
            alt="image"
          />
          <div className="z-10 flex flex-col items-center justify-center text-white">
            <h4 className="mb-3 text-2xl">Nu rata ocazia</h4>
            <span className="mb-11 text-base font-light">
              Descoperă acum Oferte de Top, și rezervă rapid bilete la cel mai
              bun preț!
            </span>
            <Button className="flex h-11 w-[460px] items-center justify-center rounded-full bg-brand-blue px-8 text-base font-light text-white ">
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
    <div className="absolute left-0 top-[80px] z-0 block h-72 w-full  rounded-b-[50px] ">
      <Image
        className="absolute left-0 top-0 z-0"
        src={blogBanner}
        alt="banner-image"
      />
      <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <p className="pt-32 text-center text-3xl leading-10 text-white">
          Lorem ipsum dolor sit amet consectetur. Mattis <br /> pretium
          pellentesque tincidunt quam.
        </p>
      </div>
    </div>
  )
}
