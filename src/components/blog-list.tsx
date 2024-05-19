import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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
  footerSubtitle?: React.ReactNode
  buttonTitle?: string
  buttonUrl?: string
  count?: number
}

export const BlogList = (props: IBlogListProps) => {
  const {
    title,
    subtitle,
    footerSubtitle,
    buttonTitle,
    buttonUrl = '#',
    count = 4,
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
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
        {Array.from({ length: count }).map((_, index) => (
          <Link className="[&_img]:hover:scale-110" key={index} href="/blog/1">
            <Card className="overflow-hidden rounded-t-[16px] pb-4 transition-[.5s] hover:shadow-lg">
              <CardHeader className="max-h-[302px] overflow-hidden rounded-t-xl p-0">
                <Image
                  className="duration-300 ease-in-out "
                  src={card1}
                  alt="card"
                />
              </CardHeader>
              <CardContent>
                <h3 className="mt-4 text-sm lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam.
                </h3>
                <p className="mt-4 hidden text-base font-light lg:block">
                  Lorem ipsum dolor sit amet consectetur. Mattis pretium
                  pellentesque tincidunt quam.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div
        className={`flex items-center ${footerSubtitle ? 'justify-between' : 'justify-end'} mt-8`}
      >
        {footerSubtitle && (
          <p className="text-sm font-light">{footerSubtitle}</p>
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
