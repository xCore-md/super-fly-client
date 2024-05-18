'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import logoBlue from '@/assets/img/logo-blue.png'
import logoWhite from '@/assets/img/logo-white.png'
import supportImgUrl from '@/assets/img/support.png'

export const Header = () => {
  const [isSimpleHeader, setIsSimpleHeader] = useState(false)
  const tel = '+(373) 60 456 654'
  const pathname = usePathname()

  useEffect(() => {
    if (
      pathname === '/about' ||
      pathname === '/contacts' ||
      pathname === '/blog' ||
      pathname === '/confirm-reservation' ||
      pathname === '/blog/1' ||
      pathname === '/reservation' ||
      pathname === '/manage-reservations'
    ) {
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
        <Link className="w-[152px]" href="/">
          <Image src={isSimpleHeader ? logoBlue : logoWhite} alt="logo" />
        </Link>

        <nav className="pl-32">
          <ul
            className={`flex gap-9 text-xs  ${isSimpleHeader ? 'text-black' : 'text-white'}`}
          >
            <li>
              <Link href="/">Acasa</Link>
            </li>
            <li>
              <Link href="/about">Despre noi</Link>
            </li>
            <li>
              <Link href="/blog">Informatii utile</Link>
            </li>
            <li>
              <Link href="/contacts">Contacte</Link>
            </li>
            <li>
              <Link href="/manage-reservations">Gestionare rezervari</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <div>
            <a
              href={tel}
              className={`flex flex-col ${isSimpleHeader ? 'text-black' : 'text-white'}`}
            >
              <span className="text-right text-xs">Contacteaza-ne</span>
              <span className="text-base">{tel}</span>
            </a>
          </div>
          <Image
            className="ml-4"
            src={supportImgUrl}
            alt="support"
            width={48}
            height={48}
          />
          <div
            className={`ml-16 flex cursor-pointer items-center text-sm uppercase ${isSimpleHeader ? 'text-black' : 'text-white'}`}
          >
            ro
          </div>
        </div>
      </div>
    </header>
  )
}
