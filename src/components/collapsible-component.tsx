'use client'

import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import { Collapsible } from '@radix-ui/react-collapsible'
import minus from '@/assets/img/minus.svg'
import plus from '@/assets/img/plus.svg'
import { Button } from './ui/button'
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

interface ICollapsibleComponentProps {
  title: string
  content: ReactElement
}

const CollapsibleComponent = (props: ICollapsibleComponentProps) => {
  const { title, content } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-full bg-white"
    >
      <CollapsibleTrigger className="w-full text-left lg:text-center">
        <div
          className={`flex h-10 items-center justify-between rounded-full px-1 pl-3 lg:h-[63px] lg:px-4 ${isOpen ? 'bg-blue-700' : 'border border-gray-200 bg-white'}`}
        >
          <span
            className={`text-xxs font-light lg:text-lg ${isOpen ? 'text-white' : 'text-black'}`}
          >
            {title}
          </span>
          <Button
            className={`h-[28px] min-h-[28px] w-[28px] min-w-[28px] rounded-full p-0 lg:h-[38px] lg:w-[38px] ${isOpen ? 'bg-white' : 'bg-blue-700 shadow-md shadow-slate-400'}`}
          >
            <Image
              src={isOpen ? minus : plus}
              alt="plus-icon"
              width={18}
              height={18}
            />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`-mt-10 rounded-b-[20px] bg-white px-5 pb-4 pt-14 ${isOpen ? 'shadow-lg shadow-slate-200' : ''}`}
      >
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleComponent
