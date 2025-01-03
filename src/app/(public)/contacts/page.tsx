'use client'

import Image from 'next/image'
import Link from 'next/link'
import clock from '@/assets/img/clock.svg'
import fb from '@/assets/img/fb.svg'
import insta from '@/assets/img/insta.svg'
import mail from '@/assets/img/mail.svg'
import marker from '@/assets/img/marker.svg'
import phone from '@/assets/img/phone.svg'
import { ButtonVeziLocatia } from '@components/button-vezi-locatia'
import { useTranslationsContext } from '@/context/translations-context'

export default function Contacts() {
  const { lang, translations: t } = useTranslationsContext()

  return (
    <section className="mt-4 animate-fade-up pb-20 fill-mode-forwards">
      <Header />
      <div className="mx-auto flex w-full max-w-[737px] flex-col gap-6">
        <div className="mt-16 rounded-2xl bg-white p-7 shadow-md">
          <div className="mx-auto flex max-w-[588px]  flex-col">
            <h2 className="text-center text-2xl font-semibold text-brand-blue">
              {info.title[lang]}
            </h2>

            <p className="mt-3 text-center text-base font-light  text-[#828282]">
              {info.subtitle[lang]}
            </p>

            <div className="col-span-2 mt-6 flex justify-center gap-4">
              <Link href="/public">
                <Image src={fb} alt="social" width={24} height={24} />
              </Link>
              <Link href="/public">
                <Image src={insta} alt="social" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-12 shadow-md">
          <ul className="flex flex-col gap-6">
            <li className="flex w-full justify-between border-b-[1px] border-b-gray-200 pb-4 ">
              <Link
                href="tel:+(373) 60 851 555"
                className="flex items-center gap-4"
              >
                <span className="text-sm font-semibold">
                  {info.phone[lang]}:
                </span>
                <span className="text-sm font-medium text-gray-600">
                  +(373) 60 851 555
                </span>
              </Link>
              <Image src={phone} alt="icon" />
            </li>
            <li className="flex w-full justify-between border-b-[1px] border-b-gray-200 pb-4 ">
              <Link
                href="mailto:info@superfly.md"
                className="flex items-center gap-4"
              >
                <span className="text-sm font-semibold">Email:</span>
                <span className="text-sm font-medium text-gray-600">
                  info@superfly.md
                </span>
              </Link>
              <Image src={mail} alt="icon" />
            </li>
            <li className="flex w-full justify-between border-b-[1px] border-b-gray-200 pb-4 ">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">
                  {info.address[lang]}:
                </span>
                <span className="text-sm font-medium text-gray-600">
                  str. A. Sciusev 62a
                </span>
              </div>
              <Image src={marker} alt="icon" />
            </li>
            <li className="flex w-full justify-between ">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{t.schedule}:</span>
                <span className="text-sm font-medium text-gray-600">
                  {t.monSun}, 9:00-18:00
                </span>
              </div>
              <Image src={clock} alt="icon" />
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-12 shadow-md">
          <ul className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0">
            <li className="flex flex-col">
              <span className="mb-3 text-sm font-medium text-brand-blue">
                {info.societyName[lang]}
              </span>
              <span className="text-sm text-gray-600">
                Superfly Invest S.R.L.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="mb-3 text-sm font-medium text-brand-blue">
                {info.profile[lang]}
              </span>
              <span className="text-sm text-gray-600">
                {info.tourismAgency[lang]}
              </span>
            </li>
            <li className="flex flex-col">
              <span className="mb-3 text-sm font-medium text-brand-blue">
                IDNO
              </span>
              <span className="text-sm text-gray-600">1023600005966</span>
            </li>
            <li className="flex flex-col">
              <span className="mb-3 text-sm font-medium text-brand-blue">
                {info.sedio[lang]}
              </span>
              <span className="text-sm text-gray-600">
                Str Alexei Sciusev 62a, <br /> mun. Chișinău
              </span>
            </li>
          </ul>
        </div>
        <ButtonVeziLocatia />
      </div>
    </section>
  )
}

const Header = () => {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 h-64 w-full"></div>
    </>
  )
}

const info: any = {
  title: {
    ro: 'Contactează-ne',
    ru: 'Свяжитесь с нами',
  },
  subtitle: {
    ro: 'Dacă ai întrebări despre rezervări, tarife, destinații sau orice altceva legat de călătorii, nu ezita să ne contactezi! Suntem disponibili pentru a oferi asistență personalizată și răspunsuri la orice nelămurire ai.',
    ru: 'Если у вас есть вопросы о бронировании, тарифах, направлениях или чем-то еще, свяжитесь с нами! Мы готовы предоставить персонализированную помощь и ответы на все ваши вопросы.',
  },
  societyName: {
    ro: 'Denumire societate',
    ru: 'Название компании',
  },
  profile: {
    ro: 'Profil',
    ru: 'Профиль',
  },
  tourismAgency: {
    ro: 'Agenție de turism',
    ru: 'Туристическое агентство',
  },
  sedio: {
    ro: 'Sediu social',
    ru: 'Юридический адрес',
  },
  phone: {
    ro: 'Telefon',
    ru: 'Телефон',
  },
  address: {
    ro: 'Adresa',
    ru: 'Адрес',
  },
}
