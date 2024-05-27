import { BlogList } from '@/components/blog-list'
import { usefulInfo } from '@/data/data'

export default function Blog() {
  return (
    <section className="container mx-auto p-0">
      <div className="mb-4 mt-5 flex justify-center lg:mt-20">
        <div className="flex w-[1000px] flex-col  items-center">
          <h3 className="mb-2 text-xl font-semibold text-brand-blue lg:text-2xl">
            Informații utile
          </h3>
          <p className="mb-6 max-w-[568px] text-center text-sm font-light text-gray-500 lg:text-base">
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
      <BlogList title="" subtitle="" items={usefulInfo} />
    </section>
  )
}
