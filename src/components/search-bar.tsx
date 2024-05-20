import Image from 'next/image'
import Link from 'next/link'
import arrive from '@/assets/img/arrive.svg'
import calendar from '@/assets/img/calendar.svg'
import departure from '@/assets/img/departure.svg'
import human from '@/assets/img/human.svg'
import refresh from '@/assets/img/refresh.svg'
import search from '@/assets/img/search.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SearchBar = () => {
  return (
    <div className="flex w-full max-w-[1152px] items-center rounded-full lg:h-[68px] lg:w-auto lg:bg-white lg:pl-6 lg:pr-2">
      <div className="flex w-full flex-col items-center justify-between lg:flex-row lg:gap-4">
        <div className="flex w-full items-center gap-4 rounded-t-3xl border-r-[1px] border-gray-300 bg-white pr-3 lg:w-auto lg:rounded-none lg:bg-transparent">
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
          <Button variant="link" className="h-22 w-22 p-0 hover:bg-transparent">
            <Image src={refresh} alt="image" width={36} height={36} />
          </Button>
        </div>

        <div className="flex w-full items-center gap-4 rounded-b-2xl border-r-[1px] border-gray-300 bg-white pr-3 lg:w-auto lg:rounded-none lg:bg-transparent">
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

        <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3">
          <div className="grid max-w-sm items-center pt-2">
            <Label
              className=" text-xs uppercase text-gray-400"
              htmlFor="departure"
            >
              PLECARE
            </Label>
            <Input
              className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              id="departure"
              placeholder="Alege data"
            />
          </div>
          <Button variant="link" className="h-22 w-22 p-0 hover:bg-transparent">
            <Image src={calendar} alt="image" width={28} height={28} />
          </Button>
        </div>

        <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3">
          <div className="grid max-w-sm items-center pt-2">
            <Label
              className=" text-xs uppercase text-gray-400"
              htmlFor="departure"
            >
              RETUR
            </Label>
            <Input
              className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              id="departure"
              placeholder="Alege data"
            />
          </div>
          <Button variant="link" className="h-22 w-22 p-0 hover:bg-transparent">
            <Image src={calendar} alt="image" width={28} height={28} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Image src={human} alt="image" width={14} height={14} />
          <div className="ml-1 grid max-w-sm items-center pt-2">
            <Label
              className=" text-xs uppercase text-gray-400"
              htmlFor="departure"
            >
              PASAGERI
            </Label>
            <Input
              className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              id="departure"
              placeholder="Passagers"
            />
          </div>
        </div>

        <Link
          href="/flights"
          className=" search-button-shadow flex h-[56px] w-[62px] items-center justify-center rounded-full bg-emerald-400 hover:opacity-90"
        >
          <Image src={search} alt="image" width={20} height={20} />
        </Link>
      </div>
    </div>
  )
}
