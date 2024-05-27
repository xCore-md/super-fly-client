'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import fb from '@/assets/img/fb.svg'
import insta from '@/assets/img/insta.svg'
import logo from '@/assets/img/logo-footer.png'
import mail from '@/assets/img/mail.svg'
import mastercard from '@/assets/img/mastercard.svg'
import paynet from '@/assets/img/paynet.svg'
import phone from '@/assets/img/phone.svg'
import visa from '@/assets/img/visa.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'

interface FooterList {
  title: string
  items: { label: string; href: string }[]
}

export const Footer = () => {
  const pathname = usePathname()

  const list: FooterList[] = [
    {
      title: 'Țările de Top',
      items: [
        { label: 'Philippines', href: '#' },
        { label: 'Italy', href: '#' },
        { label: 'United Kingdom', href: '#' },
        { label: 'Spain', href: '#' },
        { label: 'Nigeria', href: '#' },
        { label: 'France', href: '#' },
      ],
    },
    {
      title: 'Orașe de Top',
      items: [
        { label: 'London', href: '#' },
        { label: 'Paris', href: '#' },
        { label: 'Rome', href: '#' },
        { label: 'Dubai', href: '#' },
        { label: 'Manila', href: '#' },
        { label: 'Lagos', href: '#' },
      ],
    },
    {
      title: 'Companii Aeriene',
      items: [
        // { label: 'Blue Air', href: '#' },
        // { label: 'Ryan Air', href: '#' },
        // { label: 'Tarom', href: '#' },
        // { label: 'EasyJet', href: '#' },
        // { label: 'LOT', href: '#' },
        // { label: 'Air France', href: '#' },
        // { label: 'Air Moldova', href: '#' },
        { label: 'Turkish Airlines', href: '#' },
        { label: 'FlyOne', href: '#' },
        { label: 'HiSky', href: '#' },
        { label: 'Wizz Air', href: '#' },
        { label: 'Lufthansa', href: '#' },
        { label: 'Air Arabia', href: '#' },
        { label: 'United Airlines', href: '#' },
      ],
    },
    {
      title: 'Ajutor & Support',
      items: [
        { label: 'Rezervările mele', href: '#' },
        { label: 'Support Clienți', href: '#' },
        { label: 'Taxe pentru Bagaje', href: '#' },
        { label: 'Informații utile', href: '/blog' },
        { label: 'Întrebări frecvente', href: '#' },
      ],
    },
    {
      title: 'Despre Noi',
      items: [
        { label: 'Întrebări frecvente', href: '#' },
        { label: 'Rezervările mele', href: '#' },
        { label: 'Support Clienți', href: '#' },
        { label: 'Informații utile', href: '#' },
        { label: 'Contactează-ne', href: '#' },
        { label: 'Despre Noi', href: '#' },
        { label: 'Politica de Confidențialitate', href: '#' },
        { label: 'Termeni și Condiții', href: '#' },
      ],
    },
  ]
  if (pathname.includes('admin')) return null

  return (
    <div className="rounded-t-[40px] border-t-2 bg-white px-0 py-14 max-[1440px]:px-5">
      <div className="container mx-auto px-0">
        <FooterColumns list={list} />

        <hr className="my-8" />

        <div className="mb-10 grid grid-cols-1 items-center justify-center justify-items-center gap-4 lg:grid-cols-12 lg:justify-items-start lg:gap-0">
          <Link href="/">
            <Image src={logo} alt="log" width={82} height={16} />
          </Link>
          <p className="text-xs text-gray-500 lg:col-span-4">
            Misiunea noastră este de a oferi clienților noștri o experiență de
            călătorie memorabilă, fără a-i împovăra cu cheltuieli mari. Ne
            mândrim cu faptul că suntem o agentie de bilete avia de încredere,
            care pune clienții pe primul loc. De aceea, vă oferim servicii de
            calitate superioară, începând cu procesul de rezervare și până la
            întoarcerea acasă.
          </p>

          <div className="flex justify-center gap-4 lg:col-span-2">
            <Link href="/">
              <Image src={fb} alt="social" width={32} height={32} />
            </Link>
            <Link href="/">
              <Image src={insta} alt="social" width={32} height={32} />
            </Link>
          </div>

          <div className="flex flex-col items-center lg:col-span-2">
            <Link
              href="tel:+(373) 60 456 654"
              className="mb-2 flex items-center gap-1"
            >
              <Image src={phone} alt="icon" width={20} height={20} />
              <span className="text-xs">+(373) 60 456 654</span>
            </Link>
            <Link
              href="mailto:info@superfly.md"
              className="flex items-center gap-1"
            >
              <Image src={mail} alt="icon" width={20} height={20} />
              <span className="text-xs">info@superfly.md</span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-5 lg:col-span-3 lg:gap-16">
            <Image src={mastercard} width={52} height={40} alt="icon" />
            <Image src={visa} width={78} height={44} alt="icon" />
            <Image src={paynet} width={73} height={38} alt="icon" />
          </div>
        </div>
        <iframe
          className="h-[300px] w-full rounded-[20px] border-0 border-gray-200 focus:border-0 focus-visible:border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
    &q=Space+Needle,Seattle+WA"
        ></iframe>
      </div>
    </div>
  )
}

const FooterColumns = ({ list }: { list: FooterList[] }) => {
  return (
    <>
      <div className="hidden grid-cols-5 lg:grid">
        {list.map(({ title, items }) => (
          <div key={title}>
            <h4 className="mb-5 text-lg font-medium text-blue-700">{title}</h4>
            <ul key={title}>
              {items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mb-5 text-gray-500 transition-all hover:text-gray-900"
                >
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full lg:hidden">
        {list.map(({ title, items }) => (
          <AccordionItem key={title} value={title} className="border-0">
            <AccordionTrigger className="hover:no-underline active:no-underline">
              <h4 className="text-lg font-medium text-blue-700">{title}</h4>
            </AccordionTrigger>
            <AccordionContent>
              <ul key={title}>
                {items.map(({ label, href }) => (
                  <li
                    key={label}
                    className="mb-3 text-gray-500 transition-all hover:text-gray-900"
                  >
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
