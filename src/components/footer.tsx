'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import fbOriginal from '@/assets/img/fb-original.svg'
import instaOriginal from '@/assets/img/insta-original.svg'
import logo from '@/assets/img/logo-footer.png'
import mail from '@/assets/img/mail.svg'
import mastercardS from '@/assets/img/mastercard-s.svg'
import paynetS from '@/assets/img/paynet-icon-s.svg'
import phone from '@/assets/img/phone.svg'
import visaS from '@/assets/img/visa-s.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from 'antd'
import { ChevronDown } from 'lucide-react'

export const Footer = () => {
  const pathname = usePathname()

  const list = [
    {
      title: 'Țările de Top',
      expanded: false,
      items: [
        'Italia',
        'Londra',
        'Germania',
        'Israel',
        'Franta',
        'Belgia',
        'Irlanda',
        'Statele Unite ale Americii',
        'Rusia',
        'Spania',
        'China',
        'Japonia',
        'Canada',
      ],
    },
    {
      title: 'Orașe de Top',
      expanded: false,
      items: [
        'Milano',
        'Bove',
        'Venetia',
        'Charles de Gaulle',
        'Bologna',
        'Tel Aviv',
        'Barcelona',
        'Chisinau',
        'Dublin',
        'Roma',
        'Munich',
        'Brussels',
        'Frankfurt',
        'Berlin',
        'Moscova',
        'New York',
        'Tokyo',
      ],
    },
    {
      title: 'Companii Aeriene',
      items: [
        'Hisky',
        'Wizz air',
        'Turkish Airlines',
        'TAROM',
        'EasyJet',
        'LOT Polish',
        'Lufthansa',
        'Flyone',
        'Aegian',
        'Pegasus',
      ],
    },
  ]

  const listWithLinks = [
    {
      title: 'SUPERFLY.MD',
      items: [
        { label: 'Rezervările mele', href: '/manage-reservations' },
        { label: 'Support Clienți', href: '/contacts' },
        { label: 'Taxe pentru Bagaje', href: '/blog/2' },
        { label: 'Informații utile', href: '/blog' },
        { label: 'Întrebări frecvente', href: '/#questions' },
        { label: 'Contactează-ne', href: '/contacts' },
        { label: 'Despre Noi', href: '/about' },
        { label: 'Politica de Confidențialitate', href: '/policy' },
        { label: 'Termeni și Condiții', href: '/terms' },
      ],
    },
  ]
  if (pathname.includes('admin')) return null

  return (
    <div className="rounded-t-[40px] border-t-2 bg-white px-0 py-14 max-[1440px]:px-5">
      <div className="container mx-auto px-0">
        <FooterColumns list={list} listWithLinks={listWithLinks} />

        <hr className="my-8" />

        <div className="mb-10 grid grid-cols-1 items-center justify-center justify-items-center gap-4 lg:grid-cols-12 lg:justify-items-start lg:gap-0">
          <Link href="/">
            <Image
              src={logo}
              alt="log"
              width={82}
              height={16}
              className="w-full md:w-auto"
            />
          </Link>
          <p className="text-xs text-gray-500 md:pr-6 lg:col-span-4">
            Misiunea noastră este de a oferi clienților noștri o experiență de
            călătorie memorabilă, fără a-i împovăra cu cheltuieli mari. Ne
            mândrim cu faptul că suntem o agentie de bilete avia de încredere,
            care pune clienții pe primul loc. De aceea, vă oferim servicii de
            calitate superioară, începând cu procesul de rezervare și până la
            întoarcerea acasă.
          </p>

          <div className="flex justify-center gap-4 lg:col-span-2">
            <Link href="/">
              <Image src={fbOriginal} alt="social" width={32} height={32} />
            </Link>
            <Link href="/">
              <Image src={instaOriginal} alt="social" width={32} height={32} />
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
            <Image src={mastercardS} width={52} height={40} alt="icon" />
            <Image src={visaS} width={78} height={44} alt="icon" />
            <Image src={paynetS} width={73} height={38} alt="icon" />
          </div>
        </div>
        <iframe
          className="h-[300px] w-full rounded-[20px] border-0 border-gray-200 focus:border-0 focus-visible:border-0"
          loading="lazy"
          id="mapWithOurLocation"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.053308026205!2d28.826282677124617!3d47.01955862833004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c2df05fe8e7%3A0xb9598dac3f330e65!2zU3RyYWRhIEFsZXhlaSDFnmNpdXNldiA2MkEsIENoaciZaW7Eg3UsINCc0L7Qu9C00L7QstCw!5e0!3m2!1sru!2s!4v1722370156015!5m2!1sru!2s"
        ></iframe>
      </div>
    </div>
  )
}

const FooterColumns = ({ list, listWithLinks }: any) => {
  const [listItems, setListItems] = useState<any[]>(list)

  const updateExpanded = useCallback(
    (index: number) => {
      const newList = listItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            expanded: !item.expanded,
          }
        }
        return item
      })
      setListItems(newList)
    },
    [listItems]
  )

  return (
    <>
      <div className="hidden grid-cols-4 lg:grid">
        {listItems.map(({ title, items, expanded }: any, index) => (
          <div key={title}>
            <h4 className="mb-3 text-lg font-medium text-blue-700">{title}</h4>
            <ul key={title}>
              {items
                .slice(0, expanded ? items.length : 9)
                .map((item: string, index: number) => (
                  <li
                    key={index}
                    className="mb-2 text-gray-500 transition-all hover:cursor-default hover:text-gray-900"
                  >
                    {item}
                  </li>
                ))}
            </ul>
            {index !== 2 && (
              <Button
                className="flex items-center px-0 text-gray-500"
                type="text"
                icon={<ChevronDown size={16} />}
                onClick={() => updateExpanded(index)}
              >
                mai mult
              </Button>
            )}
          </div>
        ))}

        {listWithLinks.map(({ title, items }: any) => (
          <div key={title} className="col-span-1">
            <h4 className="mb-3 text-lg font-medium text-blue-700">{title}</h4>
            <ul>
              {items.map(({ label, href }: any) => (
                <li
                  key={label}
                  className="mb-3 text-gray-500 hover:cursor-pointer hover:text-blue-700"
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full lg:hidden">
        {list.map(({ title, items }: any) => (
          <AccordionItem key={title} value={title} className="border-0">
            <AccordionTrigger className="py-2 hover:no-underline active:no-underline">
              <h4 className="text-lg font-medium text-blue-700">{title}</h4>
            </AccordionTrigger>
            <AccordionContent>
              <ul key={title}>
                {items.map((item: any) => (
                  <li
                    key={item}
                    className="mb-3 text-gray-500 transition-all hover:text-gray-900"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}

        {listWithLinks.map(({ title, items }: any) => (
          <AccordionItem key={title} value={title} className="border-0">
            <AccordionTrigger className="py-2 hover:no-underline active:no-underline">
              <h4 className="text-lg font-medium text-blue-700">{title}</h4>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {items.map(({ label, href }: any) => (
                  <li key={label} className="mb-3 text-gray-500">
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
