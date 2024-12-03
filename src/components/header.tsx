'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Select, Segmented } from 'antd'
import logoWhite from '@/assets/img/logo-w.svg'
import logoBlue from '@/assets/img/logo.svg'
import support from '@/assets/img/support.png'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTranslationsContext } from '@/context/translations-context'
import 'dayjs/locale/ru'
import 'dayjs/locale/ro'

interface IMenu {
  title: string
  href: string
}
interface IHeaderProps {
  menu: {
    [key: string]: {
      title: string
      href: string
    }[]
  }
}
export const Header = ({ menu }: IHeaderProps) => {
  const [isSimpleHeader, setIsSimpleHeader] = useState(false)
  const tel = '+(373) 60 851 555'
  const pathname = usePathname()
  const { lang, setLang, translations: t } = useTranslationsContext()

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/flights') {
      setIsSimpleHeader(true)
    } else {
      setIsSimpleHeader(false)
    }
  }, [pathname])

  return (
    <div
      className={`sticky left-0 top-0 z-40 flex justify-center ${isSimpleHeader ? 'bg-white text-black shadow-lg' : 'bg-brand-blue text-white'}`}
    >
      <div className="custom-container w-full">
        <div
          className={`relative z-10 flex h-20 w-full items-center justify-between ${isSimpleHeader ? '' : 'border-b-[0.1px] border-b-blue-500'}`}
        >
          <Link className="w-[88px] md:w-[188px]" href="/">
            <Image
              src={isSimpleHeader ? logoBlue : logoWhite}
              alt="logo"
              width={148}
            />
          </Link>

          <nav className="hidden pl-32 lg:block">
            <NavList menu={menu[lang]} isSimpleHeader={isSimpleHeader} />
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex animate-waveShadow items-center rounded-lg p-2">
              <div>
                <Link
                  href={`tel:${tel}`}
                  className={`flex flex-col ${isSimpleHeader ? 'text-black' : 'text-white'}`}
                >
                  <span className="text-right text-[8px] md:text-xxs">
                    {t.getInTouch}
                  </span>
                  <span className="text-xs font-medium md:text-base">
                    {tel}
                  </span>
                </Link>
              </div>
              <div className="relative">
                <div className=" pointer-events-none relative ml-4 h-[41px] w-[42px] overflow-hidden rounded-full ">
                  <Image src={support} alt="icon" />
                </div>
                <span className=" absolute right-0 top-2 h-[6px] w-[6px] animate-pulse rounded-full bg-green-400"></span>
              </div>
            </div>
            <Select
              className={`${isSimpleHeader ? 'lang-selector-dark' : 'lang-selector'} hidden lg:block`}
              value={lang}
              onChange={setLang}
            >
              <Select.Option value="ru">RU</Select.Option>
              <Select.Option value="ro">RO</Select.Option>
            </Select>

            <div className="lg:hidden">
              <MobileMenu menu={menu[lang]} isSimpleHeader={isSimpleHeader} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NavList = ({
  isSimpleHeader,
  closeMenu,
  menu,
}: {
  isSimpleHeader: boolean
  closeMenu?: () => void
  menu: IMenu[]
}) => {
  return (
    <ul
      className={`flex flex-col items-center gap-4 pt-2 text-sm text-black lg:flex-row lg:gap-9 ${!isSimpleHeader ? 'lg:text-white' : ''}`}
    >
      {menu?.map(({ title, href }) => (
        <li
          key={title}
          className={`${isSimpleHeader ? 'nav-link-hover-dark' : 'nav-link-hover'} pb-1 text-xs`}
        >
          <Link
            href={href}
            onClick={() => {
              closeMenu?.()
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const MobileMenu = ({
  isSimpleHeader,
  menu,
}: {
  isSimpleHeader: boolean
  menu: IMenu[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)
  const tel = '+(373) 60 851 555'
  const { lang, setLang, translations: t } = useTranslationsContext()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex h-8 w-8 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="14"
          fill="none"
          viewBox="0 0 18 14"
        >
          <path
            stroke={isSimpleHeader ? 'black' : 'white'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1.667h16M1 7h16M1 12.333h16"
          ></path>
        </svg>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            <Link
              className="flex h-[20px] w-[110px] items-center justify-center overflow-hidden"
              href="/"
            >
              <Image width={110} height={60} src={logoBlue} alt="logo" />
            </Link>
          </SheetTitle>
          <SheetDescription>
            <nav className="mt-5 text-sm text-black">
              <NavList
                menu={menu}
                isSimpleHeader={isSimpleHeader}
                closeMenu={closeMenu}
              />
              <div className="mt-2 flex justify-center">
                <Segmented
                  value={lang.toLocaleUpperCase()}
                  className="my-2"
                  onChange={(value) => setLang(value.toLowerCase())}
                  options={['RU', 'RO']}
                />
              </div>
              <div className="absolute bottom-7 -ml-6 flex w-full items-center justify-center">
                <div>
                  <Link
                    href={`tel:${tel}`}
                    className={`flex flex-col text-black`}
                  >
                    <span className="text-right text-xxs lg:text-sm">
                      {t.getInTouch}
                    </span>
                    <span className="text-xs font-medium lg:text-base">
                      {tel}
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <div className=" pointer-events-none relative ml-4 h-[41px] w-[42px] overflow-hidden rounded-full ">
                    <Image src={support} alt="icon" />
                  </div>
                  <span className=" absolute right-0 top-2 h-[6px] w-[6px] animate-pulse rounded-full bg-green-400"></span>
                </div>
              </div>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
