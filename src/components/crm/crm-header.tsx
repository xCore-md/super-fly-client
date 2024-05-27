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
} from '@components/ui/sheet'

interface IMenu {
  title: string
  href: string
}

export const CrmHeader = () => {
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
      className={`sticky left-0 top-0 z-30 shadow-md ${isSimpleHeader ? 'bg-white text-black ' : 'bg-brand-blue text-white'}`}
    >
      <header
        className={`  max-[1440px]:px-5 ${isSimpleHeader ? 'shadow-lg shadow-gray-300' : ''}`}
      >
        <div
          className={`container  z-10 mx-auto flex h-20 items-center justify-between p-0 ${isSimpleHeader ? '' : 'border-b-[0.1px] border-b-blue-500'}`}
        >
          <Link className="w-[88px] lg:w-[152px]" href="/public">
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
                <p className="flex text-[#969696]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <g clip-path="url(#clip0_4_282)">
                      <path
                        d="M12.0002 2C10.1437 2 8.36318 2.7375 7.05043 4.05025C5.73767 5.36301 5.00017 7.14348 5.00017 9V12.528C5.00032 12.6831 4.96437 12.8362 4.89517 12.975L3.17817 16.408C3.0943 16.5757 3.0547 16.7621 3.06312 16.9494C3.07155 17.1368 3.12773 17.3188 3.22632 17.4783C3.32491 17.6379 3.46265 17.7695 3.62644 17.8608C3.79024 17.9521 3.97465 18 4.16217 18H19.8382C20.0257 18 20.2101 17.9521 20.3739 17.8608C20.5377 17.7695 20.6754 17.6379 20.774 17.4783C20.8726 17.3188 20.9288 17.1368 20.9372 16.9494C20.9457 16.7621 20.906 16.5757 20.8222 16.408L19.1062 12.975C19.0366 12.8362 19.0003 12.6832 19.0002 12.528V9C19.0002 7.14348 18.2627 5.36301 16.9499 4.05025C15.6372 2.7375 13.8567 2 12.0002 2ZM12.0002 21C11.3796 21.0002 10.7741 20.8079 10.2673 20.4498C9.7605 20.0916 9.37718 19.5851 9.17017 19H14.8302C14.6232 19.5851 14.2399 20.0916 13.733 20.4498C13.2262 20.8079 12.6208 21.0002 12.0002 21Z"
                        fill="#575757"
                      />
                      <circle cx="17" cy="4" r="3" fill="#F42D2D" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4_282">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Notificări (<span className="text-[#F42D2D]">1</span>)
                </p>
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
      className={`flex flex-col items-start gap-3 text-sm text-black lg:flex-row lg:gap-9 ${!isSimpleHeader ? 'lg:text-white' : ''}`}
    >
      {menu.map(({ title, href }) => (
        <li key={title}>
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
            <Link href="/public">
              <Image width={88} src={logoBlue} alt="logo" />
            </Link>
          </SheetTitle>
          <SheetDescription>
            <nav className="mt-5 text-sm text-black">
              <NavList
                menu={menu}
                isSimpleHeader={isSimpleHeader}
                closeMenu={closeMenu}
              />
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

const menu: IMenu[] = [
  { title: 'Căutare', href: '/cautare' },
  { title: 'Calendar', href: '/calendar' },
  { title: 'Bilete', href: '/bilete' },
  { title: 'Clienți', href: '/clienti' },
  { title: 'Lead-uri', href: '/leaduri' },
]
