'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Collapsible } from '@radix-ui/react-collapsible'
import chevronDown from '@/assets/img/chevronDown.svg'
import chevronUp from '@/assets/img/chevronUp.svg'
import minus from '@/assets/img/minus.svg'
import plus from '@/assets/img/plus.svg'
import { Button } from './ui/button'
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { useTranslationsContext } from '@/context/translations-context'

interface ICollapsibleComponentProps {
  items: {
    title: {
      [key: string]: string
    }
    text: {
      [key: string]: string
    }
  }[]
}

const CollapsibleComponent = (props: ICollapsibleComponentProps) => {
  const { items } = props
  const [currentOpened, setCurrentOpened] = useState(0)
  const { lang } = useTranslationsContext()

  const isOpen = (index: number) => index === currentOpened

  return items.map(({ title, text }, index) => (
    <Collapsible
      key={index}
      open={isOpen(index)}
      onOpenChange={() => setCurrentOpened(index)}
      className="w-full rounded-full bg-white"
    >
      <CollapsibleTrigger
        asChild
        className="relative z-10 w-full text-left lg:text-center"
      >
        <div
          className={`flex h-14 items-center justify-between rounded-full p-2 pl-6 lg:h-[63px] lg:p-4 ${isOpen(index) ? 'bg-brand-blue' : 'border border-gray-200 bg-white'}`}
        >
          <span
            className={`pr-4 text-sm font-light lg:text-lg ${isOpen(index) ? 'text-white' : 'text-black'}`}
          >
            {title[lang]}
          </span>
          <Button
            className={`h h-8 min-h-8 w-8 min-w-8 rounded-full p-0 lg:h-[32px] lg:w-[32px] ${isOpen(index) ? 'bg-white' : 'custom-light-shadow bg-brand-blue'}`}
          >
            <Image
              className=" hidden lg:block"
              src={isOpen(index) ? minus : plus}
              alt="plus-icon"
              width={18}
              height={18}
            />

            <Image
              className="block lg:hidden"
              src={isOpen(index) ? chevronUp : chevronDown}
              alt="plus-icon"
              width={12}
              height={12}
            />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`-mt-10 animate-opacityBlock rounded-b-[20px] bg-white px-4 pb-[14px] pt-14 md:px-8 md:pb-8 md:pt-16 ${isOpen(index) ? 'shadow-lg shadow-slate-200' : ''}`}
      >
        <span className="md:text-md block text-sm text-gray-500">
          {text[lang]}
        </span>
      </CollapsibleContent>
    </Collapsible>
  ))
}

export default CollapsibleComponent
