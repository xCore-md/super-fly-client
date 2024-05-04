import Image from 'next/image'
import Link from 'next/link'
import card1 from '@/assets/img/card1.jpg'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface IBlogListItemProps {
  image: string
  title: string
  subtitle?: string
}

interface IBlogListProps {
  title: string
  subtitle?: string
  items?: IBlogListItemProps[]
  footerSubtitle?: string
  buttonTitle?: string
  buttonUrl?: string
}

export const BlogList = (props: IBlogListProps) => {
  const {
    title,
    subtitle,
    footerSubtitle,
    buttonTitle,
    buttonUrl = '#',
  } = props
  return (
    <section className="mb-24">
      <h2 className={`text-2xl font-medium ${subtitle ? 'mb-2' : 'mb-6'}`}>
        {title}
      </h2>
      {subtitle && (
        <span
          className="mb-4 text-sm font-light"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
      <div className="mt-6 grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <a key={index} href="#">
            <Card className=" overflow-hidden rounded-t-[16px] pb-4 transition-all hover:shadow-lg">
              <CardHeader className="rounded-xl p-0">
                <Image src={card1} alt="card" />
              </CardHeader>
              <CardContent>
                <h3 className="mt-4 text-xl">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam.
                </h3>
                <p className="text-md mt-4 font-light">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam.
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      <div
        className={`flex items-center ${footerSubtitle ? 'justify-between' : 'justify-end'} mt-8`}
      >
        {footerSubtitle && (
          <p className="text-sm font-light">
            Obțineți economii mari la zboruri și pachete de vacanță cu
            promoțiile noastre exclusive. <br /> Răsfoiți cele mai recente
            oferte și rezervați-vă astăzi următoarea călătorie!
          </p>
        )}
        {buttonTitle && (
          <Link
            href={buttonUrl}
            className="flex h-11 items-center justify-center rounded-full bg-blue-700 px-8 font-light text-white shadow-md shadow-slate-400"
          >
            <span>{buttonTitle.trim()}</span>
          </Link>
        )}
      </div>
    </section>
  )
}
