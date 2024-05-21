'use client'
import Image from 'next/image'
import { useState } from 'react'
import crossFillSvgUrl from '@/assets/img/cross-fill.svg'
import drawerOfferImgUrl from '@/assets/img/drawer-offer.png'
import logoBlue from '@/assets/img/logo-blue.png'
import supportV2ImgUrl from '@/assets/img/support-v2.png'
import { Button } from '@components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@components/ui/drawer'
import { Input } from '@components/ui/input'

interface IGetOfferDrawerProps {
  variant?: 'blue' | 'standard'
}

export const GetOfferDrawer = ({
  variant = 'standard',
}: IGetOfferDrawerProps) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent hideTopBar className="bg-brand-blue">
        <DrawerHeader className="relative flex gap-5 pt-12 text-left">
          <Image
            src={crossFillSvgUrl}
            alt={'cross'}
            className="absolute right-5 top-5 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          {variant === 'blue' ? <OfferBlue /> : <OfferStandard />}
        </DrawerHeader>
        <DrawerFooter>
          <Input
            type="text"
            placeholder="Numar de telefon*"
            id="reservation-form-phone-number"
          />
          <Button className="bg-brand-green font-light">Obține ofertele</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const OfferBlue = () => {
  return (
    <div>
      {/*todo: try to export the images*/}
      <Image src={drawerOfferImgUrl} alt={'offer'} />
    </div>
  )
}

const OfferStandard = () => {
  return (
    <>
      <Image src={logoBlue} alt="logo" width={88} className="absolute top-4" />
      <Image
        className="ml-2 h-[86px] w-[86px] rounded-full bg-[#E1E1E1] object-cover p-0.5"
        src={supportV2ImgUrl}
        alt="support"
        width={86}
        height={86}
      />
      <div>
        <h6 className="text-lg font-medium">Fii Informat!</h6>
        <p className="text-xs font-light text-[#4A4A4A]">
          Introduce datele de contact, și operatorii noștri revin cu oferte
          personalizate.
        </p>
      </div>
    </>
  )
}
