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
        'gsap-animate mb-14 fill-mode-forwards lg:mb-24',
        className
      )}
    >
      <h2
        className={`text-lg font-medium lg:text-2xl ${subtitle ? 'mb-2' : 'mb-6'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <span
          className="mb-4 text-sm font-light"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
      <div className="mt-6 flex snap-x gap-x-3 gap-y-5 overflow-x-scroll lg:grid lg:grid-cols-5 lg:gap-x-5 lg:gap-y-12">
        {items?.map(({ title, text, img }, index) => (
          <Link
            className="snap-center [&_img]:hover:scale-110"
            key={index}
            href={`/blog/${index}`}
          >
            <Card className="overflow-hidden rounded-t-[16px] pb-4 transition-[.5s] hover:shadow-lg">
              <CardHeader className="max-h-[302px] overflow-hidden rounded-t-xl p-0">
                <Image
                  className="h-56 object-cover duration-300 ease-in-out"
                  src={img}
                  alt="card"
                />
              </CardHeader>
              <CardContent className={withDestinationsAndPrices ? '' : 'px-4'}>
                <div className="min-w-44">
                  <h3 className="mt-4 line-clamp-1 text-sm lg:text-xl">
                    {title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-base font-light max-[768px]:hidden">
                    {text}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div
        className={`hidden items-center lg:flex ${footerSubtitle ? 'justify-between' : 'justify-end'} mt-8`}
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
