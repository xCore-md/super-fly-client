import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import tenKgSvg from '@/assets/img/bags/10kg.svg'
import twentyKgSvg from '@/assets/img/bags/20kg.svg'
import thirtyKgSvg from '@/assets/img/bags/30kg.svg'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import checkMarkSvg from '@/assets/img/check-mark.svg'
import passportSvg from '@/assets/img/passport.svg'
import { cn } from '@/lib/utils'
import { FlightsListing } from '@components/flights/flights-listing'
import { BagNumberInput } from '@components/form/bag-number-input'
import { ReservationSummary } from '@components/reservation/reservation-summary'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Separator } from '@components/ui/separator'

export default function Reservation() {
  return (
    <div className="mt-4 flex pb-10 pt-12">
      <section className="flex w-2/3 flex-col">
        <h2 className="text-xs font-bold">Informații zbor:</h2>

        <FlightsListing length={4} />

        <MainForm />

        <OnlineCheckinSection />

        <div className="ml-3 mt-4 flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm text-xxxs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sunt de acord cu{' '}
            <Link className="text-[#596AD9]" href="/">
              Politica de confidentialitate
            </Link>
            și cu{' '}
            <Link className="text-[#596AD9]" href={'/'}>
              Termenii si conditiile
            </Link>
          </label>
        </div>

        <Button className="mt-8 flex h-11 items-center justify-center rounded-full bg-brand-green px-8 font-light text-white shadow-md shadow-slate-400">
          Rezervă acum
        </Button>
      </section>
      <aside className="ml-20 flex w-1/3">
        <ReservationSummary />
      </aside>
    </div>
  )
}

const MainForm = () => {
  return (
    <ReservationCard>
      <div className="flex gap-5">
        <Input type="text" placeholder="Prenume*" />
        <Input type="text" placeholder="Nume*" />
      </div>
      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Codul tarii*" />
        <Input type="text" placeholder="Numar de telefon*" />
      </div>
      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Adresa de email*" />
      </div>

      <div className="mt-7 rounded-md border border-[#E7E7E7] bg-[#F0F2FF] p-3 text-sm">
        Adaugă datele pașaportului
      </div>

      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Prenume*" />
        <Input type="text" placeholder="Nume*" />
        <Input type="text" placeholder="Data nașterii*" />
      </div>
      <div className="mt-5 flex gap-5">
        <Input type="text" placeholder="Număr document*" />
        <Input type="text" placeholder="Data Eliberării*" />
        <Input type="text" placeholder="Data Expirării*" />
      </div>
      <Button className="mt-8 flex h-11 items-center justify-center rounded-lg bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400">
        <span className="mr-2">Poza pașaport</span>
        <Image src={passportSvg} alt={'passport image'} />
      </Button>

      <p className="mt-5 text-xxs">
        <span className="text-gray-500">Document încărcat:</span>{' '}
        <span>file321455xx45522668adasda65ss.jpg</span>
      </p>
      <p className="mt-1 text-xxs text-red-500">Șterge poza</p>

      <Separator className="my-8" />

      <BaggageSection />
    </ReservationCard>
  )
}

const BaggageSection = () => {
  const bags = [
    {
      id: 'obiect_personal',
      size: '40 x 20 x 30 cm',
      name: 'Obiect personal',
      price: 'Inclus Gratuit',
      imageUrl: eightKgSvg,
      hideInput: true,
    },
    {
      id: 'bagaj_de_mana',
      size: '57 x 20 x 38 cm',
      name: 'Bagaj de mana',
      price: '10.99€',
      imageUrl: tenKgSvg,
    },
    {
      id: 'bagaj_de_cala',
      size: '78 x 28 x 52 cm',
      name: 'Bagaj de cala',
      price: '20.99€',
      imageUrl: twentyKgSvg,
    },
    {
      id: 'bagaj_de_cala_mare',
      size: '78 x 28 x 52 cm',
      name: 'Bagaj de cala',
      price: '30.99€',
      imageUrl: thirtyKgSvg,
    },
  ]

  return (
    <section className="grid grid-cols-4 gap-6">
      {bags.map((bag) => (
        <div key={bag.id}>
          <Card className="mb-4 flex flex-col justify-between rounded-xl text-center">
            <CardHeader className="flex min-h-[169px] flex-1 flex-col items-center justify-end">
              <Image
                src={bag.imageUrl}
                alt="bag"
                className="mb-3 select-none "
              />
              <span className="text-xxs text-[#757575]">{bag.size}</span>
            </CardHeader>
            <CardContent className="mt-auto rounded-xl bg-brand-light-blue p-2">
              <h6 className="text-xs font-medium">{bag.name}</h6>
              <p className="mt-0.5 text-xxs text-green-600">{bag.price}</p>
            </CardContent>
          </Card>

          {bag.hideInput ? null : <BagNumberInput id={bag.id} />}
        </div>
      ))}
    </section>
  )
}

const OnlineCheckinSection = () => {
  return (
    <ReservationCard className="relative rounded-t-3xl">
      <header className="absolute left-0 right-0 top-0 flex justify-between rounded-3xl bg-brand-light-blue px-4 py-3">
        <h5 className="text-sm font-bold text-[#121C5E]">Check-in Online</h5>
        <span className="rounded-full bg-brand-yellow px-3 py-2 text-xxxs">
          Popular
        </span>
      </header>

      <main className="mt-6 flex justify-between">
        <div className="">
          <h6>Adaugă check-in-ul online!</h6>
          <ul className="line-he text-xxxs font-medium leading-[8px] text-[#7E7E7E]">
            <li className="mt-2 flex items-center">
              <CheckMark />
              Dacă nu achiziționezi acest serviciu, va fi necesar să efectuezi
              check-in-ul independent
            </li>
            <li className="mt-1 flex items-center">
              <CheckMark />
              Economisești timp și bani: check-in-ul direct la aeroport poate
              genera cheltuieli suplimentare sau întârzieri
            </li>
            <li className="mt-1 flex items-center">
              <CheckMark />
              Emitem cărțile de îmbarcare la timp
            </li>
          </ul>
        </div>
        <Button className="mt-8 flex h-auto max-w-32 items-center justify-center whitespace-normal rounded-full bg-brand-blue px-6 text-[10px] font-light text-white shadow-md shadow-slate-400 ">
          Adaugă €8.99 per pasager
        </Button>
      </main>
    </ReservationCard>
  )
}

interface ICheckMarkProps {
  className?: string
}

const CheckMark = (props: ICheckMarkProps) => {
  return (
    <Image
      src={checkMarkSvg}
      alt={'check mark'}
      width={9}
      height={9}
      className={cn('mr-2', props.className)}
    />
  )
}

interface IReservationCardProps {
  children: React.ReactNode
  className?: string
}

const ReservationCard = (props: IReservationCardProps) => {
  return (
    <div
      className={cn(
        'mt-14 rounded-2xl bg-white p-10 shadow-md',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
