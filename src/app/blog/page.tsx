import { BlogList } from '@/components/blog-list'

export default function Blog() {
  return (
    <section className="container mx-auto p-0">
      <div className="mb-4 mt-20 flex justify-center">
        <div className="flex w-[1000px] flex-col  items-center">
          <h3 className="mb-2 text-2xl font-semibold text-brand-blue">
            Informații utile
          </h3>
          <p className="text-md mb-6 max-w-[568px] text-center font-light text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Mattis pretium pellentesque
            tincidunt quam. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
      <BlogList title="" subtitle="" count={8} />
    </section>
  )
}
