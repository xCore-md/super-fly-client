'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import logoBlue from '@/assets/img/logo-blue.png'
import logoWhite from '@/assets/img/logo-white.png'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface IMenu {
  title: string
  href: string
}
interface IHeaderProps {
  menu: IMenu[]
}
export const Header = ({ menu }: IHeaderProps) => {
  const [isSimpleHeader, setIsSimpleHeader] = useState(false)
  const tel = '+(373) 60 456 654'
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/flights') {
      setIsSimpleHeader(true)
    } else {
      setIsSimpleHeader(false)
    }
  }, [pathname])

  return (
    <div
      className={`sticky left-0 top-0 z-40 shadow-md ${isSimpleHeader ? 'bg-white text-black ' : 'bg-brand-blue text-white'}`}
    >
      <header
        className={`  max-[1440px]:px-5 ${isSimpleHeader ? 'shadow-lg shadow-gray-300' : ''}`}
      >
        <div
          className={`container  z-10 mx-auto flex h-20 items-center justify-between p-0 ${isSimpleHeader ? '' : 'border-b-[0.1px] border-b-blue-500'}`}
        >
          <Link className="w-[88px] lg:w-[152px]" href="/">
            <Image src={isSimpleHeader ? logoBlue : logoWhite} alt="logo" />
          </Link>

          <nav className="hidden pl-32 lg:block">
            <NavList menu={menu} isSimpleHeader={isSimpleHeader} />
          </nav>

          <div className="flex items-center">
            <div>
              <Link
                href={`tel:${tel}`}
                className={`flex flex-col ${isSimpleHeader ? 'text-black' : 'text-white'}`}
              >
                <span className="text-right text-xxs lg:text-sm">
                  Contacteaza-ne
                </span>
                <span className="text-xs font-medium lg:text-base">{tel}</span>
              </Link>
            </div>
            <div className="relative">
              <div className=" pointer-events-none relative ml-4 h-[41px] w-[42px] overflow-hidden rounded-full ">
                <iframe
                  src="https://giphy.com/embed/3o6MblrTJN0gLi61Rm"
                  width="58"
                  height="58"
                  className=" -translate-x-2 -translate-y-2"
                ></iframe>
              </div>
              <span className=" absolute bottom-0 right-0 animate-pulse rounded-full bg-green-400 p-1.5"></span>
            </div>
            {/* <div
              className={`ml-16 hidden cursor-pointer items-center text-sm uppercase lg:flex ${isSimpleHeader ? 'text-black' : 'text-white'}`}
            >
              ro
            </div> */}
          </div>

          <div className="lg:hidden">
            <MobileMenu menu={menu} isSimpleHeader={isSimpleHeader} />
          </div>
        </div>
      </header>
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
      className={`flex flex-col items-start gap-4 text-sm text-black lg:flex-row lg:gap-9 ${!isSimpleHeader ? 'lg:text-white' : ''}`}
    >
      {menu.map(({ title, href }) => (
        <li key={title} className="">
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
  const tel = '+(373) 60 456 654'

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
            <Link href="/">
              <Image width={110} src={logoBlue} alt="logo" />
            </Link>
          </SheetTitle>
          <SheetDescription>
            <nav className="mt-5 text-sm text-black">
              <NavList
                menu={menu}
                isSimpleHeader={isSimpleHeader}
                closeMenu={closeMenu}
              />

              <div className="absolute bottom-7 -ml-6 flex w-full items-center justify-center">
                <div>
                  <Link
                    href={`tel:${tel}`}
                    className={`flex flex-col text-black`}
                  >
                    <span className="text-right text-xxs lg:text-sm">
                      Contacteaza-ne
                    </span>
                    <span className="text-xs font-medium lg:text-base">
                      {tel}
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <div className=" pointer-events-none relative ml-4 h-[41px] w-[42px] overflow-hidden rounded-full ">
                    <iframe
                      src="https://giphy.com/embed/3o6MblrTJN0gLi61Rm"
                      width="58"
                      height="58"
                      className=" -translate-x-2 -translate-y-2"
                    ></iframe>
                  </div>
                  <span className=" absolute bottom-0 right-0 animate-pulse rounded-full bg-green-400 p-1.5"></span>
                </div>
              </div>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
