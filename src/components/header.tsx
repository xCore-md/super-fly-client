'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import logoBlue from '@/assets/img/logo-blue.png'
import logoWhite from '@/assets/img/logo-white.png'
import supportImgUrl from '@/assets/img/support.png'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const Header = () => {
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
    <header
      className={`max-[1440px]:px-5 ${isSimpleHeader ? 'shadow-lg shadow-gray-300' : ''}`}
    >
      <div
        className={`container relative z-10 mx-auto flex h-20 items-center justify-between p-0 ${isSimpleHeader ? '' : 'border-b-[0.1px] border-b-blue-500'}`}
      >
        <Link className="w-[88px] lg:w-[152px]" href="/">
          <Image src={isSimpleHeader ? logoBlue : logoWhite} alt="logo" />
        </Link>

        <nav className="hidden pl-32 lg:block">
          <NavList isSimpleHeader={isSimpleHeader} />
        </nav>

        <div className="flex items-center">
          <div>
            <a
              href={tel}
              className={`flex flex-col ${isSimpleHeader ? 'text-black' : 'text-white'}`}
            >
              <span className="text-right text-xxs lg:text-sm">
                Contacteaza-ne
              </span>
              <span className="text-xs font-medium lg:text-base">{tel}</span>
            </a>
          </div>
          <Image
            className="ml-4 h-[35px] w-[35px] lg:h-[48px] lg:w-[48px]"
            src={supportImgUrl}
            alt="support"
            width={48}
            height={48}
          />
          <div
            className={`ml-16 hidden cursor-pointer items-center text-sm uppercase lg:flex ${isSimpleHeader ? 'text-black' : 'text-white'}`}
          >
            ro
          </div>
        </div>

        <div className="lg:hidden">
          <MobileMenu isSimpleHeader={isSimpleHeader} />
        </div>
      </div>
    </header>
  )
}

const NavList = ({
  isSimpleHeader,
  closeMenu,
}: {
  isSimpleHeader: boolean
  closeMenu?: () => void
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

const MobileMenu = ({ isSimpleHeader }: { isSimpleHeader: boolean }) => {
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
            <Link href="/">
              <Image width={88} src={logoBlue} alt="logo" />
            </Link>
          </SheetTitle>
          <SheetDescription>
            <nav className="mt-5 text-sm text-black">
              <NavList isSimpleHeader={isSimpleHeader} closeMenu={closeMenu} />
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

const menu = [
  {
    title: 'Acasa',
    href: '/',
  },
  {
    title: 'Despre noi',
    href: '/about',
  },
  {
    title: 'Informatii utile',
    href: '/blog',
  },
  {
    title: 'Contacte',
    href: '/contacts',
  },
  {
    title: 'Gestionare rezervari',
    href: '/manage-reservations',
  },
]
