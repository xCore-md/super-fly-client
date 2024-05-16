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
import { DatePicker } from '@components/ui/datepicker'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'

export default function Reservation() {
  return (
    <div className="mt-4 flex flex-col pb-10 pt-12 lg:flex-row">
      <section className="flex flex-col lg:w-2/3">
        <h2 className="text-sm font-bold">Informații zbor:</h2>

        <FlightsListing length={3} withoutAction />

        <MainForm />

        <OnlineCheckinSection />

        <div className="ml-3 mt-4 flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm text-xxs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

        <Link
          href="/confirm-reservation"
          className="mt-8 hidden h-11 items-center justify-center rounded-full bg-brand-green px-8 font-light text-white shadow-md shadow-slate-400 lg:flex"
        >
          Rezervă acum
        </Link>
      </section>
      <aside className="flex lg:ml-20 lg:w-1/3">
        <ReservationSummary />
      </aside>
    </div>
  )
}

const MainForm = () => {
  return (
    <ReservationCard>
      <div className="flex flex-col lg:flex-row lg:gap-5">
        <Label htmlFor="first-name" className="mb-1 ml-1 lg:hidden">
          Prenume
        </Label>
        <Input
          id="reservation-form-first-name"
          type="text"
          placeholder="Prenume*"
        />

        <Label
          htmlFor="reservation-form-last-name"
          className="mb-1 ml-1 mt-3 lg:hidden"
        >
          Nume
        </Label>
        <Input
          id="reservation-form-last-name"
          type="text"
          placeholder="Nume*"
        />
      </div>

      <div className="mt-3 flex flex-col lg:mt-5 lg:flex-row lg:gap-5">
        <Label
          htmlFor="reservation-form-country-code"
          className="mb-1 ml-1 lg:hidden"
        >
          Codul tarii
        </Label>
        <Input
          type="text"
          placeholder="Codul tarii*"
          id="reservation-form-country-code"
        />

        <Label
          htmlFor="reservation-form-phone-number"
          className="mb-1 ml-1 mt-3 lg:hidden"
        >
          Numar de telefon
        </Label>
        <Input
          type="text"
          placeholder="Numar de telefon*"
          id="reservation-form-phone-number"
        />
      </div>

      {/*todo: add phone and birth date */}

      <div className="mt-3 flex flex-col lg:mt-5 lg:gap-5">
        <Label htmlFor="reservation-form-email" className="mb-1 ml-1 lg:hidden">
          Adresa de email
        </Label>
        <Input
          type="text"
          placeholder="Adresa de email*"
          id="reservation-form-email"
        />
      </div>

      <div className="mt-3 rounded-md border border-[#E7E7E7] bg-[#F0F2FF] p-3 text-sm lg:mt-7">
        Adaugă datele pașaportului
      </div>

      <div className="mt-3 flex flex-col lg:mt-5 lg:flex-row lg:gap-5">
        <Label htmlFor="prenume" className="mb-1 ml-1 lg:hidden">
          Prenume
        </Label>
        <Input type="text" placeholder="Prenume*" id="prenume" />

        <Label htmlFor="nume" className="mb-1 ml-1 mt-3 lg:hidden">
          Nume
        </Label>
        <Input type="text" placeholder="Nume*" id="nume" />

        <Label htmlFor="data-nasterii" className="mb-1 ml-1 mt-3 lg:hidden">
          Data nașterii
        </Label>
        {/*<Input type="text" placeholder="Data nașterii*" id="data-nasterii" />*/}
        <DatePicker />
      </div>

      <div className="mt-3 flex flex-col lg:mt-5 lg:flex-row lg:gap-5">
        <Label htmlFor="numar-document" className="mb-1 ml-1 lg:hidden">
          Număr document
        </Label>
        <Input type="text" placeholder="Număr document*" id="numar-document" />

        <Label htmlFor="data-eliberarii" className="mb-1 ml-1 mt-3 lg:hidden">
          Data Eliberării
        </Label>
        <DatePicker />
        {/*<Input*/}
        {/*  type="text"*/}
        {/*  placeholder="Data Eliberării*"*/}
        {/*  id="data-eliberarii"*/}
        {/*/>*/}

        <Label htmlFor="data-expirarii" className="mb-1 ml-1 mt-3 lg:hidden">
          Data Expirării
        </Label>
        {/*<Input type="text" placeholder="Data Expirării*" id="data-expirarii" />*/}
        <DatePicker />
      </div>

      <Button className="mt-8 flex h-11 w-full items-center justify-center rounded-lg bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400">
        <span className="mr-2">Poza pașaport</span>
        <Image src={passportSvg} alt={'passport image'} />
      </Button>

      <p className="mt-5 text-xs">
        <span className="text-gray-500">Document încărcat:</span>{' '}
        <span>file321455xx45522668adasda65ss.jpg</span>
      </p>
      <p className="mt-1 text-xs text-red-500">Șterge poza</p>

      <Separator className="my-8" />

      <BaggageSection />
    </ReservationCard>
  )
}
interface IBags {
  id: string
  size: string
  name: string
  price: string
  imageUrl: string
  hideInput?: boolean
}
const BaggageSection = () => {
  const bags: IBags[] = [
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
    <section className="grid gap-6 lg:grid-cols-4">
      {bags.map((bag) => (
        <div key={bag.id}>
          <Card className="mb-4 flex justify-between rounded-xl text-center lg:flex-col">
            <CardHeader className="flex max-w-72 flex-1 flex-row items-center justify-between px-5 py-3 lg:min-h-[169px] lg:max-w-none lg:flex-1 lg:flex-col lg:justify-end lg:p-6">
              <Image
                src={bag.imageUrl}
                alt="bag"
                className="mb-3 mr-2 select-none lg:mr-0"
              />

              <div className="text-left lg:text-center">
                <span className="text-xs text-[#757575]">{bag.size}</span>
                <div className="lg:hidden">
                  <BagTypeAndPrice bag={bag} />
                </div>
              </div>
            </CardHeader>

            {/*mobile*/}
            <CardContent className="flex-2 flex w-28 items-center border-l-2 px-5 py-3 lg:hidden lg:p-6">
              {bag.hideInput ? (
                <p className="mt-0.5 text-xs text-green-600">{bag.price}</p>
              ) : (
                <BagNumberInput id={bag.id} />
              )}
            </CardContent>

            {/*desktop*/}
            <CardContent className="mt-auto hidden rounded-xl bg-brand-light-blue p-2 lg:block">
              <BagTypeAndPrice bag={bag} />
            </CardContent>
          </Card>

          <div className="hidden lg:block">
            {bag.hideInput ? null : <BagNumberInput id={bag.id} />}
          </div>
        </div>
      ))}
    </section>
  )
}

const BagTypeAndPrice = ({ bag }: { bag: IBags }) => {
  return (
    <>
      <h6 className="text-sm font-medium">{bag.name}</h6>
      <p className="mt-0.5 text-xs text-green-600">
        {bag.hideInput ? '' : bag.price}
      </p>
    </>
  )
}
const OnlineCheckinSection = () => {
  return (
    <ReservationCard className="relative rounded-t-3xl pt-14">
      <header className="absolute left-0 right-0 top-0 flex justify-between rounded-3xl bg-brand-light-blue px-4 py-3">
        <h5 className="text-sm font-bold text-[#121C5E]">Check-in Online</h5>
        <span className="rounded-full bg-brand-yellow px-3 py-2 text-xxs">
          Popular
        </span>
      </header>

      <main className="mt-6 flex flex-col justify-between lg:flex-row">
        <div className="">
          <h6>Adaugă check-in-ul online!</h6>
          <ul className="text-xxs font-medium text-[#7E7E7E]">
            <li className="mt-3 flex items-center">
              <CheckMark className="mt-1" />
              Dacă nu achiziționezi acest serviciu, va fi necesar să efectuezi
              check-in-ul independent
            </li>
            <li className="mt-2 flex items-center">
              <CheckMark className="mt-1" />
              Economisești timp și bani: check-in-ul direct la aeroport poate
              genera cheltuieli suplimentare sau întârzieri
            </li>
            <li className="mt-2 flex items-center">
              <CheckMark className="mt-1" />
              Emitem cărțile de îmbarcare la timp
            </li>
          </ul>
        </div>
        <Button className="mt-8 flex h-auto items-center justify-center whitespace-normal rounded-full bg-brand-blue px-6 text-xs font-light text-white shadow-md shadow-slate-400 lg:max-w-32 ">
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
      width={12}
      height={12}
      className={cn('mr-2 min-w-3 self-start', props.className)}
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
        'mt-14 rounded-2xl bg-white px-3 py-6 shadow-md lg:p-10',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
