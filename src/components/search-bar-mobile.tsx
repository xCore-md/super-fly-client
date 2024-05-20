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
    <div className="flex h-[68px] max-w-[1152px] items-center rounded-full bg-white pl-6 pr-2"></div>
  )
}
