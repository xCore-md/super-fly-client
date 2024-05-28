import Image from 'next/image'
import React from 'react'
import tenKgSvg from '@/assets/img/bags/10kg.svg'
import twentyKgSvg from '@/assets/img/bags/20kg.svg'
import thirtyKgSvg from '@/assets/img/bags/30kg.svg'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import passportSvg from '@/assets/img/passport.svg'
import { cn } from '@/lib/utils'
import { BagNumberInput } from '@components/form/bag-number-input'
import { ReservationCard } from '@components/reservation/reservation-card'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { DatePicker } from '@components/ui/datepicker'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'

interface IMainFormProps {
  showBaggage?: boolean
}

export const ReservationMainForm = ({ showBaggage = true }: IMainFormProps) => {
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

      {showBaggage && <BaggageSection />}
    </ReservationCard>
  )
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
    <section className="grid gap-2 lg:grid-cols-4 lg:gap-6">
      {bags.map((bag) => (
        <div key={bag.id}>
          <Card className="mb-4 flex h-[244px] justify-between rounded-xl text-center lg:flex-col">
            <CardHeader className="flex max-w-72 flex-1 flex-col items-center justify-center px-5 py-3 lg:min-h-[169px] lg:max-w-none lg:flex-1  lg:justify-end lg:p-6">
              <Image
                src={bag.imageUrl}
                alt="bag"
                height={75}
                className="mb-3 w-12 select-none lg:mr-0 lg:w-16"
              />

              <div className="w-full text-center lg:text-center">
                <span className="text-xs text-[#757575]">{bag.size}</span>
                <div className="w-full lg:hidden">
                  <BagTypeAndPrice bag={bag} />
                </div>
              </div>
            </CardHeader>

            {/*mobile*/}
            <CardContent className="flex-2 flex w-28 items-center border-l-2 px-5 py-3 lg:hidden lg:p-6">
              {bag.hideInput ? (
                <p className="mt-0.5 text-xs text-green-600">{bag.price}</p>
              ) : (
                <BagNumberInput />
              )}
            </CardContent>

            {/*desktop*/}
            <CardContent className="mt-auto hidden min-h-14 rounded-xl bg-brand-light-blue p-2 lg:block">
              <BagTypeAndPrice bag={bag} />
            </CardContent>
          </Card>

          <div className="hidden lg:block">
            {bag.hideInput ? null : <BagNumberInput />}
          </div>
        </div>
      ))}
    </section>
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

const BagTypeAndPrice = ({ bag }: { bag: IBags }) => {
  return (
    <>
      <h6 className="text-sm font-medium">{bag.name}</h6>
      <p
        className={cn('mt-0.5 text-xs text-green-600 lg:block', {
          hidden: bag.hideInput,
        })}
      >
        {bag.price}
      </p>
    </>
  )
}
