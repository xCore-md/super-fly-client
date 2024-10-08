'use client'

import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAnimationFadeIn } from '@/lib/hooks/useAnimationFadeIn'
import { cn } from '@/lib/utils'

interface IBlogListItemProps {
  img: StaticImageData
  title: string
  text?: string
}

interface IBlogListProps {
  title: string
  subtitle?: string
  items?: IBlogListItemProps[]
  footerSubtitle?: React.ReactNode
  buttonTitle?: string
  buttonUrl?: string
  count?: number
  withDestinationsAndPrices?: boolean
  className?: string
}

export const BlogList = (props: IBlogListProps) => {
  const {
    title,
    subtitle,
    footerSubtitle,
    buttonTitle,
    buttonUrl = '#',
    items,
    withDestinationsAndPrices,
    className = '',
  } = props

  useAnimationFadeIn('.gsap-animate')

  return (
    <section
      className={cn(
        'gsap-animate mb-14 fill-mode-forwards lg:mb-36',
        className
      )}
    >
      <h2
        className={`text-lg font-medium text-[#323232] lg:text-2xl ${subtitle ? 'mb-2' : 'mb-6'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <span
          className="mb-4 text-base font-light"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
      <div className="mt-6 flex snap-x gap-x-3 gap-y-5 overflow-x-scroll pb-5 pr-4 lg:grid lg:grid-cols-5 lg:gap-x-5 lg:gap-y-12 lg:pr-0">
        {items?.map(({ title, text, img }, index) => (
          <Link
            className="snap-center [&_img]:hover:scale-110"
            key={index}
            href={`/blog/${index}`}
          >
            <Card className="custom-shadow overflow-hidden rounded-t-[16px] transition-[.5s] hover:shadow-lg">
              <CardHeader className="max-h-[302px] overflow-hidden rounded-t-xl p-0">
                <Image
                  className="h-[177px] min-w-[171px] object-cover duration-300 ease-in-out md:h-[270px]"
                  src={img}
                  alt="card"
                />
              </CardHeader>
              <CardContent
                className={
                  withDestinationsAndPrices
                    ? ''
                    : 'px-[10px] pb-5 md:px-5 md:pb-10'
                }
              >
                <div>
                  <h3 className="mt-[14px] line-clamp-2 text-sm md:mt-5 lg:text-xl">
                    {title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm font-light max-[768px]:hidden">
                    {text}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div
        className={`flex items-center pr-4 lg:pr-0 ${footerSubtitle ? 'justify-between' : 'justify-end'} md:mt-8`}
      >
        {footerSubtitle && (
          <p className="text-sm font-light">{footerSubtitle}</p>
        )}
        {buttonTitle && (
          <Link
            href={buttonUrl}
            className="custom-light-shadow flex h-9 w-full items-center justify-center rounded-full bg-blue-700 px-8 text-sm font-light text-white md:h-11 md:w-fit md:text-base"
          >
            <span>{buttonTitle.trim()}</span>
          </Link>
        )}
      </div>
    </section>
  )
}
