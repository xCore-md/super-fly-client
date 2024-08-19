'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Collapsible } from '@radix-ui/react-collapsible'
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
      className="rounded-full bg-white"
    >
      <CollapsibleTrigger
        asChild
        className="relative z-10 w-full text-left lg:text-center"
      >
        <div
          className={`flex items-center justify-between rounded-full p-6 lg:h-[63px] lg:px-4 ${isOpen(title) ? 'bg-blue-700' : 'border border-gray-200 bg-white'}`}
        >
          <span
            className={`pr-4 text-sm font-light lg:text-lg ${isOpen(title) ? 'text-white' : 'text-black'}`}
          >
            {title}
          </span>
          <Button
            className={`h-[28px] min-h-[28px] w-[28px] min-w-[28px] rounded-full p-0 lg:h-[38px] lg:w-[38px] ${isOpen(title) ? 'bg-white' : 'bg-blue-700 shadow-md shadow-slate-400'}`}
          >
            <Image
              src={isOpen(title) ? minus : plus}
              alt="plus-icon"
              width={18}
              height={18}
            />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`-mt-10 rounded-b-[20px] bg-white px-5 pb-4 pt-14 ${isOpen(title) ? 'shadow-lg shadow-slate-200' : ''}`}
      >
        <span className="text-md block px-2 py-3 text-gray-500">{text}</span>
      </CollapsibleContent>
    </Collapsible>
  ))
}

export default CollapsibleComponent
