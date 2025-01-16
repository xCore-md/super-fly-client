'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Button, Collapse } from 'antd'
import { ChevronDown } from 'lucide-react'
import fbOriginal from '@/assets/img/fb-original.svg'
import instaOriginal from '@/assets/img/insta-original.svg'
import logo from '@/assets/img/logo.svg'
import mail from '@/assets/img/mail.svg'
import mastercardS from '@/assets/img/mastercard-s.svg'
import paynetS from '@/assets/img/paynet-icon-s.svg'
import phone from '@/assets/img/phone.svg'
import visaS from '@/assets/img/visa-s.svg'
import { useTranslationsContext } from '@/context/translations-context'

export const Footer = () => {
  const pathname = usePathname()
  const { lang, translations: t } = useTranslationsContext()

  const list = [
    {
      title: {
        ro: 'Țările de Top',
        ru: 'Топовые страны',
      },
      expanded: false,
      items: {
        ro: [
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
        ru: [
          'Италия',
          'Лондон',
          'Германия',
          'Израиль',
          'Франция',
          'Бельгия',
          'Ирландия',
          'Соединенные Штаты Америки',
          'Россия',
          'Испания',
          'Китай',
          'Япония',
          'Канада',
        ],
      },
    },
    {
      title: {
        ro: 'Orașe de Top',
        ru: 'Топовые города',
      },
      expanded: false,
      items: {
        ro: [
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
        ru: [
          'Милан',
          'Бове',
          'Венеция',
          'Шарль де Голль',
          'Болонья',
          'Тель-Авив',
          'Барселона',
          'Кишинев',
          'Дублин',
          'Рим',
          'Мюнхен',
          'Брюссель',
          'Франкфурт',
          'Берлин',
          'Москва',
          'Нью-Йорк',
          'Токио',
        ],
      },
    },
    {
      title: {
        ro: 'Companii Aeriene',
        ru: 'Авиакомпании',
      },
      expanded: false,
      items: {
        ro: [
          { title: 'Hisky', url: `${pathname}?company=hiSky` },
          { title: 'Wizz air ', url: `${pathname}?company=wizzAir` },
          { title: 'Turkish Airlines ', url: '/' },
          { title: 'TAROM', url: '/' },
          { title: 'EasyJet', url: '/' },
          { title: 'LOT Polish ', url: '/' },
          { title: 'Lufthansa', url: '/' },
          { title: 'Flyone', url: `${pathname}?company=flyOne` },
          { title: 'Aegian', url: '' },
          { title: 'Pegasus', url: '/' },
        ],
        ru: [
          { title: 'Hisky', url: `${pathname}?company=hiSky` },
          { title: 'Wizz air', url: `${pathname}?company=wizzAir` },
          { title: 'Turkish Airlines', url: '/' },
          { title: 'TAROM', url: '/' },
          { title: 'EasyJet', url: '/' },
          { title: 'LOT Polish', url: '/' },
          { title: 'Lufthansa', url: '/' },
          { title: 'Flyone', url: `${pathname}?company=flyOne` },
          { title: 'Aegian', url: '/' },
          { title: 'Pegasus', url: '/' },
        ],
      },
    },
  ]

  const listWithLinks = [
    {
      title: {
        ro: 'SUPERFLY.MD',
        ru: 'SUPERFLY.MD',
      },
      items: [
        {
          label: {
            ro: 'Rezervările mele',
            ru: 'Мои бронирования',
          },
          href: '/manage-reservations',
        },
        {
          label: {
            ro: 'Support Clienți',
            ru: 'Поддержка клиентов',
          },
          href: '/contacts',
        },
        {
          label: {
            ro: 'Taxe pentru Bagaje',
            ru: 'Сборы за багаж',
          },
          href: '/blog/2',
        },
        {
          label: {
            ro: 'Informații utile',
            ru: 'Полезная информация',
          },
          href: '/blog',
        },
        {
          label: {
            ro: 'Întrebări frecvente',
            ru: 'Часто задаваемые вопросы',
          },
          href: '/#questions',
        },
        {
          label: {
            ro: 'Contactează-ne',
            ru: 'Свяжитесь с нами',
          },
          href: '/contacts',
        },
        {
          label: {
            ro: 'Despre Noi',
            ru: 'О нас',
          },
          href: '/about',
        },
        {
          label: {
            ro: 'Politica de Confidențialitate',
            ru: 'Политика конфиденциальности',
          },
          href: '/policy',
        },
        {
          label: {
            ro: 'Termeni și Condiții',
            ru: 'Условия и положения',
          },
          href: '/terms',
        },
      ],
    },
  ]

  if (pathname.includes('admin')) return null

  return (
    <div className=" max-w-[1280px] rounded-t-[40px] border-t-[1px] bg-white px-5 pb-14 pt-8 lg:max-w-none lg:px-[90px] lg:pt-[76px]">
      <div className="mx-auto max-w-[1280px] px-0 lg:max-w-none">
        <FooterColumns
          list={list}
          listWithLinks={listWithLinks}
          lang={lang}
          t={t}
        />

        <hr className="mb-10 mt-6" />

        <div className="mb-10 grid grid-cols-1 items-center justify-center justify-items-center gap-4 lg:grid-cols-12 lg:justify-items-start lg:gap-0">
          <Link href="/">
            <Image
              src={logo}
              alt="log"
              width={82}
              height={16}
              className="w-[140px]"
            />
          </Link>
          <p className="text-center text-xxs text-gray-500 md:pr-6 md:text-left lg:col-span-4">
            {t.footer?.ourMission}
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
              href="tel:+(373) 60 851 555"
              className="mb-2 flex items-center gap-1"
            >
              <Image src={phone} alt="icon" width={20} height={20} />
              <span className="text-xs text-[#636363]">+(373) 60 851 555</span>
            </Link>
            <Link
              href="mailto:info@superfly.md"
              className="flex items-center gap-1"
            >
              <Image src={mail} alt="icon" width={20} height={20} />
              <span className="text-xs text-[#636363]">info@superfly.md</span>
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

const FooterColumns = ({ list, listWithLinks, lang, t }: any) => {
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
          <div key={index}>
            <h4 className="mb-3 text-lg font-medium text-blue-700">
              {title[lang]}
            </h4>
            <ul key={index}>
              {items?.[lang]
                .slice(0, expanded ? items.length : 9)
                .map((item: any, index: number) => (
                  <li
                    key={index}
                    className="mb-2 text-gray-500 transition-all hover:cursor-default hover:text-gray-900"
                  >
                    <Link href={item.url ? item.url : '/'}>
                      {item.title || item}
                    </Link>
                  </li>
                ))}
            </ul>
            {index !== 2 && (
              <Button
                className="flex items-center pl-0  text-gray-500"
                type="text"
                icon={<ChevronDown size={20} />}
                onClick={() => updateExpanded(index)}
              >
                {expanded ? t.footer?.lessLabel : t.footer?.moreLabel}
              </Button>
            )}
          </div>
        ))}

        {listWithLinks.map(({ title, items }: any, index: number) => (
          <div key={index} className="col-span-1">
            <h4 className="mb-3 text-lg font-medium text-blue-700">
              {title[lang]}
            </h4>
            <ul>
              {items.map(({ label, href }: any, index: number) => (
                <li
                  key={index}
                  className="mb-3 text-gray-500 hover:cursor-pointer hover:text-blue-700"
                >
                  <Link href={href}>{label[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="w-full lg:hidden">
        <Collapse
          ghost
          accordion
          expandIconPosition="end"
          destroyInactivePanel
          className="footer-collapse"
          expandIcon={({ isActive }) => (
            <ChevronDown
              size={30}
              className={`transform transition-transform ${
                isActive ? 'rotate-180' : ''
              }`}
            />
          )}
        >
          {list.map(({ title, items }: any, index: number) => (
            <Collapse.Panel
              header={title[lang]}
              key={index + 1}
              className="text-lg font-medium text-blue-700"
            >
              <ul>
                {items?.[lang].map((item: any, index: number) => (
                  <li
                    key={index}
                    className="mb-3 text-gray-500 transition-all hover:text-gray-900"
                  >
                    <Link href={item.url ? item.url : '/'}>
                      {item.title || item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Collapse.Panel>
          ))}
          {listWithLinks.map(({ title, items }: any, index: number) => (
            <Collapse.Panel
              header={title[lang]}
              key={index}
              className="text-lg font-medium text-blue-700"
            >
              <ul>
                {items.map(({ label, href }: any, index: number) => (
                  <li key={index} className="mb-3 text-gray-500">
                    <Link href={href}>{label[lang]}</Link>
                  </li>
                ))}
              </ul>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </>
  )
}
