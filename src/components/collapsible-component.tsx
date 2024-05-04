'use client'

import React, { ReactElement, useState } from 'react'

import Image from 'next/image'
import { Collapsible } from '@radix-ui/react-collapsible'
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Button } from './ui/button'
import plus from '@/assets/img/plus.svg'
import minus from '@/assets/img/minus.svg'

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
      <CollapsibleTrigger className="w-full">
        <div
          className={`flex justify-between items-center rounded-full h-[63px] px-4 ${isOpen ? 'bg-blue-700' : 'bg-white border border-gray-200'}`}
        >
          <span
            className={`text-lg font-light ${isOpen ? 'text-white' : 'text-black'}`}
          >
            {title}
          </span>
          <Button
            className={`rounded-full  h-[38px] w-[38px] p-0 ${isOpen ? 'bg-white' : 'bg-blue-700 shadow-md shadow-slate-400'}`}
          >
            <Image
              src={isOpen ? minus : plus}
              alt="plus-icon"
              width={18}
              height={38}
            />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={`rounded-b-[20px] bg-white px-5 pt-14 pb-4 -mt-10 ${isOpen ? 'shadow-lg shadow-slate-200' : ''}`}
      >
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleComponent
