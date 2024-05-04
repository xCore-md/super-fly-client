import Image from 'next/image'
import { Button } from '@/components/ui/button'
import departure from '@/assets/img/departure.svg'
import arrive from '@/assets/img/arrive.svg'
import refresh from '@/assets/img/refresh.svg'
import calendar from '@/assets/img/calendar.svg'
import human from '@/assets/img/human.svg'
import search from '@/assets/img/search.svg'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const SearchBar = () => {
  return (
    <div className="flex items-center h-[80px] pl-6 pr-2 rounded-full bg-white">
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3">
          <Image src={departure} alt="image" width={22} height={17} />
          <div className="grid max-w-sm items-center pt-2">
            <Label className="text-gray-400 uppercase mb-1" htmlFor="departure">
              ZBOR DIN
            </Label>
            <Input
              className="bg-transparent border-0 text-black p-0 outline-none focus-visible:ring-offset-0 focus-visible:ring-0 h-8 text-sm font-semibold"
              type="text"
              id="departure"
              placeholder="Chisinau (MDA)"
            />
          </div>
          <Button variant="link" className="h-22 w-22 p-0">
            <Image src={refresh} alt="image" width={36} height={36} />
          </Button>
        </div>

        <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3">
          <Image src={arrive} alt="image" width={22} height={17} />
          <div className="grid max-w-sm items-center pt-2">
            <Label className="text-gray-400 uppercase mb-1" htmlFor="departure">
              ATERIZARE ÎN
            </Label>
            <Input
              className="bg-transparent border-0 text-black p-0 outline-none focus-visible:ring-offset-0 focus-visible:ring-0 h-8 text-sm font-semibold"
              type="text"
              id="departure"
              placeholder="Alege destinația"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3">
          <div className="grid max-w-sm items-center pt-2">
            <Label className="text-gray-400 uppercase mb-1" htmlFor="departure">
              PLECARE
            </Label>
            <Input
              className="bg-transparent border-0 text-black p-0 outline-none focus-visible:ring-offset-0 focus-visible:ring-0 h-8 text-sm font-semibold"
              type="text"
              id="departure"
              placeholder="Alege data"
            />
          </div>
          <Button variant="link" className="h-22 w-22 p-0">
            <Image src={calendar} alt="image" width={28} height={28} />
          </Button>
        </div>

        <div className="flex items-center gap-4 border-r-[1px] border-gray-300 pr-3">
          <div className="grid max-w-sm items-center pt-2">
            <Label className="text-gray-400 uppercase mb-1" htmlFor="departure">
              RETUR
            </Label>
            <Input
              className="bg-transparent border-0 text-black p-0 outline-none focus-visible:ring-offset-0 focus-visible:ring-0 h-8 text-sm font-semibold"
              type="text"
              id="departure"
              placeholder="Alege data"
            />
          </div>
          <Button variant="link" className="h-22 w-22 p-0">
            <Image src={calendar} alt="image" width={28} height={28} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Image src={human} alt="image" width={14} height={14} />
          <div className="grid max-w-sm items-center pt-2 ml-1">
            <Label className="text-gray-400 uppercase mb-1" htmlFor="departure">
              PASAGERI
            </Label>
            <Input
              className="bg-transparent border-0 text-black p-0 outline-none focus-visible:ring-offset-0 focus-visible:ring-0 h-8 text-sm font-semibold"
              type="text"
              id="departure"
              placeholder="Passagers"
            />
          </div>
        </div>

        <Button
          variant="link"
          className="rounded-full w-[64px] h-[64px] bg-emerald-400 search-button-shadow"
        >
          <Image src={search} alt="image" width={20} height={20} />
        </Button>
      </div>
    </div>
  )
}
