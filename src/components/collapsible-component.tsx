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

interface ICollapsibleComponentProps {
  items: {
    title: string
    text: string
  }[]
}

const CollapsibleComponent = (props: ICollapsibleComponentProps) => {
  const { items } = props
  const [currentOpened, setCurrentOpened] = useState(items[0].title)

  const isOpen = (title: string) => title === currentOpened

  return items.map(({ title, text }) => (
    <Collapsible
      key={title}
      open={isOpen(title)}
      onOpenChange={() => setCurrentOpened(title)}
      className="w-full rounded-full bg-white"
    >
      <CollapsibleTrigger
        asChild
        className="relative z-10 w-full text-left lg:text-center"
      >
        <div
          className={`flex h-14 items-center justify-between rounded-full p-2 pl-6 lg:h-[63px] lg:p-4 ${isOpen(title) ? 'bg-brand-blue' : 'border border-gray-200 bg-white'}`}
        >
          <span
            className={`pr-4 text-sm font-light lg:text-lg ${isOpen(title) ? 'text-white' : 'text-black'}`}
          >
            {title}
          </span>
          <Button
            className={`h h-8 min-h-8 w-8 min-w-8 rounded-full p-0 lg:h-[32px] lg:w-[32px] ${isOpen(title) ? 'bg-white' : 'custom-light-shadow bg-brand-blue'}`}
          >
            <Image
              className=" hidden lg:block"
              src={isOpen(title) ? minus : plus}
              alt="plus-icon"
              width={18}
              height={18}
            />

            <Image
              className="block lg:hidden"
              src={isOpen(title) ? chevronUp : chevronDown}
              alt="plus-icon"
              width={12}
              height={12}
            />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`animate-opacityBlock -mt-10 rounded-b-[20px] bg-white px-4 pb-[14px] pt-14 md:px-8 md:pb-8 md:pt-16 ${isOpen(title) ? 'shadow-lg shadow-slate-200' : ''}`}
      >
        <span className="md:text-md block text-sm text-gray-500">{text}</span>
      </CollapsibleContent>
    </Collapsible>
  ))
}

export default CollapsibleComponent
