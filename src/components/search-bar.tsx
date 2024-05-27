'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DatePicker, Popover } from 'antd'
import arrive from '@/assets/img/arrive.svg'
import calendar from '@/assets/img/calendar.svg'
import departure from '@/assets/img/departure.svg'
import human from '@/assets/img/human.svg'
import infants from '@/assets/img/infants.svg'
import kids from '@/assets/img/kids.svg'
import refresh from '@/assets/img/refresh.svg'
import search from '@/assets/img/search.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SearchBar = ({ arrival }: { arrival: boolean }) => {
  const [openDeparture, setOpenDeparture] = useState(false)
  const [openArrival, setOpenArrival] = useState(false)
  const [passengersCount, setPassengersCount] = useState(1)
  const [passengers, setPassengers] = useState({
    adults: 1,
    kids: 0,
    infants: 0,
  })

  const handleDepartureClick = () => {
    setOpenDeparture(!openDeparture)
  }

  const handleDepartureChange = (status: any) => {
    setOpenDeparture(status)
  }

  const handleArrivalClick = () => {
    setOpenArrival(!openArrival)
  }

  const handleArrivalChange = (status: any) => {
    setOpenArrival(status)
  }

  return (
    <div className="flex w-full max-w-[1152px] items-center rounded-full lg:h-[68px] lg:w-auto lg:bg-white lg:pl-6 lg:pr-2">
      <div className="flex w-full flex-col items-center justify-between  lg:flex-row lg:gap-4">
        <div className="flex flex-row gap-4 max-[1024px]:w-full max-[1024px]:flex-col max-[1024px]:gap-0">
          <div className="relative flex w-full items-center gap-4 rounded-t-[27px] border-r-[1px] border-gray-300 bg-white pr-3 max-[1024px]:border-b-[1px] max-[1024px]:py-2 max-[1024px]:pl-4 max-[1024px]:pr-0 lg:w-auto lg:rounded-none lg:bg-transparent">
            <Image src={departure} alt="image" width={22} height={17} />
            <div className="grid max-w-sm items-center pt-2">
              <Label
                className=" text-xs uppercase text-gray-400"
                htmlFor="departure"
              >
                ZBOR DIN
              </Label>
              <Input
                className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                id="departure"
                placeholder="Chisinau (MDA)"
              />
            </div>
            <Button
              variant="link"
              className="bottom-0 right-4 h-[36px] w-[36px] p-0 hover:bg-transparent max-[1024px]:absolute max-[1024px]:translate-y-4"
            >
              <Image src={refresh} alt="image" className="h-full w-full" />
            </Button>
          </div>

          <div className="flex w-full items-center gap-4 rounded-b-[27px] border-r-[1px] border-gray-300 bg-white pr-3 max-[1024px]:border-0 max-[1024px]:py-2 max-[1024px]:pl-4 max-[1024px]:pr-0 lg:w-auto lg:rounded-none lg:bg-transparent">
            <Image src={arrive} alt="image" width={22} height={17} />
            <div className="grid max-w-sm items-center pt-2">
              <Label
                className=" text-xs uppercase text-gray-400"
                htmlFor="departure"
              >
                ATERIZARE ÎN
              </Label>
              <Input
                className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                id="departure"
                placeholder="Alege destinația"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 max-[1024px]:mt-2 max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:p-2 max-[1024px]:px-6 lg:gap-4">
          <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3 max-[1024px]:border-0  max-[1024px]:p-0">
            <div className="grid max-w-sm items-center pt-2">
              <Label className=" text-xs uppercase text-gray-400">
                PLECARE
              </Label>

              <DatePicker
                suffixIcon={null}
                format={'DD.MM.YYYY'}
                open={openDeparture}
                placeholder="Alege data"
                onChange={arrival ? handleArrivalClick : () => ({})}
                onOpenChange={handleDepartureChange}
                className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-within:border-0 focus-within:shadow-none"
              />
            </div>
            <Button
              variant="link"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={handleDepartureClick}
            >
              <Image
                className="w-7"
                src={calendar}
                alt="image"
                width={28}
                height={28}
              />
            </Button>
          </div>

          <div
            className={`flex items-center gap-4 border-r-[1px] border-gray-300 pr-3 max-[1024px]:rounded-full max-[1024px]:border-0 max-[1024px]:p-0 ${arrival ? '' : 'pointer-events-none opacity-50'}`}
          >
            <div className="grid max-w-sm items-center pt-2">
              <Label className=" text-xs uppercase text-gray-400">RETUR</Label>
              <DatePicker
                suffixIcon={null}
                format={'DD.MM.YYYY'}
                open={openArrival}
                placeholder="Alege data"
                onOpenChange={handleArrivalChange}
                className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-within:border-0 focus-within:shadow-none"
              />
            </div>
            <Button
              variant="link"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={handleArrivalClick}
            >
              <Image
                className="w-7"
                src={calendar}
                alt="image"
                width={28}
                height={28}
              />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 max-[1024px]:mt-2 max-[1024px]:w-full max-[1024px]:rounded-full max-[1024px]:bg-white max-[1024px]:py-2 max-[1024px]:pl-6">
          <Image
            className="max-[1024px]:h-8 max-[1024px]:w-3"
            src={human}
            alt="image"
            width={14}
            height={14}
          />
          <div className="ml-1 flex w-full max-w-sm flex-col items-start justify-start pr-4 pt-2">
            <Label
              className=" text-xs uppercase text-gray-400"
              htmlFor="departure"
            >
              PASAGERI
            </Label>

            <Popover
              className="w-full"
              content={
                <PopoverContent
                  passengers={passengers}
                  updatePassengersCount={setPassengers}
                />
              }
              placement="bottom"
              trigger={['click']}
            >
              <Button className="flex h-8 w-full justify-start border-0 bg-transparent p-0  text-sm font-semibold text-slate-500 outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <span>
                  {Number(Object.values(passengers).reduce((a, b) => a + b)) ||
                    ''}{' '}
                  Passengers
                </span>
              </Button>
            </Popover>
          </div>
        </div>

        <Link
          href="/flights"
          className="search-button-shadow flex h-[56px] w-[56px] items-center justify-center rounded-full bg-emerald-400 hover:opacity-90 max-[1024px]:mt-4 max-[1024px]:h-12 max-[1024px]:w-full"
        >
          <span className="mr-3  font-medium text-white min-[1024px]:hidden">
            Caută
          </span>
          <Image src={search} alt="image" width={20} height={20} />
        </Link>
      </div>
    </div>
  )
}

type TPassengers = 'adults' | 'kids' | 'infants'

interface IPopoverContent {
  passengers: {
    adults: number
    kids: number
    infants: number
  }
  updatePassengersCount: ({}) => void
}
const PopoverContent = ({
  passengers,
  updatePassengersCount,
}: IPopoverContent) => {
  const handleUpdatePassengersCount = (key: TPassengers, value: number) => {
    if (value < 0) return
    updatePassengersCount({
      ...passengers,
      [key]: value,
    })
  }

  return (
    <div className="w-full min-w-72 p-2">
      <div className="flex flex-col gap-y-6">
        {PopoverData.map(({ title, img, description, key }) => (
          <div className=" flex justify-between" key={key}>
            <div className="flex gap-2">
              <Image src={img} alt="image" className="h-8 w-6" />
              <div className="flex flex-col">
                <h4 className="text-base text-black">{title}</h4>
                <span className="text-xs text-gray-500">{description}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="h-8 w-8 rounded-full bg-gray-200 text-black hover:bg-brand-blue hover:text-white"
                onClick={() =>
                  handleUpdatePassengersCount(
                    key as TPassengers,
                    passengers[key as TPassengers] - 1
                  )
                }
              >
                -
              </Button>
              <span className="w-4 text-center text-base text-black">
                {passengers[key as TPassengers]}
              </span>
              <Button
                className="h-8 w-8 rounded-full bg-gray-200 text-black hover:bg-brand-blue hover:text-white"
                onClick={() =>
                  handleUpdatePassengersCount(
                    key as TPassengers,
                    passengers[key as TPassengers] + 1
                  )
                }
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PopoverData = [
  {
    title: 'Adulți',
    description: 'Mai mult de 12 ani',
    img: human,
    key: 'adults',
  },
  {
    title: 'Copii',
    description: '2-12 ani',
    img: kids,
    key: 'kids',
  },
  {
    title: 'Infanți',
    description: 'Pînă la 2 ani, fără loc',
    img: infants,
    key: 'infants',
  },
]
