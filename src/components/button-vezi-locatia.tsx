'use client'

import Image from 'next/image'
import markerWhite from '@/assets/img/marker-white.svg'
import { Button } from '@components/ui/button'

export const ButtonVeziLocatia = () => {
  const scrollToMap = () => {
    document.querySelector('#mapWithOurLocation')?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <Button
      className="flex h-11 w-full items-center justify-center rounded-full bg-brand-blue px-8 text-base font-light text-white shadow-md shadow-slate-400"
      onClick={scrollToMap}
    >
      Vezi locația
      <Image className="ml-1" src={markerWhite} alt="icon" />
    </Button>
  )
}
