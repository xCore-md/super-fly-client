import { usefulInfo } from '@/data/data'
import { BlogList } from '@components/blog-list'

export default function Blog() {
  return (
    <section className="custom-container padding-none animate-fade-up p-0 px-0 fill-mode-forwards">
      <div className="mb-4 mt-11 flex justify-center px-5 lg:mt-20 lg:px-0">
        <div className="flex w-[1000px] flex-col  items-center">
          <h3 className="mb-2 text-xl font-semibold text-brand-blue lg:text-2xl">
            Informații utile
          </h3>
        </div>
      </div>
      <BlogList title="" subtitle="" items={usefulInfo} />
    </section>
  )
}
