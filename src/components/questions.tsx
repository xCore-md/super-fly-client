'use client'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useTranslationsContext } from '@/context/translations-context'
import { cn } from '@/lib/utils'
import CollapsibleComponent from './collapsible-component'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Questions = () => {
  const { translations: t } = useTranslationsContext()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(
      {
        sm: '(max-width: 767px)',
        md: '(min-width: 768px)',
      },
      (ctx) => {
        gsap.fromTo(
          '.animate-right-to-left-Questions',
          { x: ctx.conditions?.sm ? -100 : -150, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            delay: 0.4,
            scrollTrigger: {
              trigger: '.animate-right-to-left-Questions',
            },
          }
        )

        gsap.fromTo(
          '.animate-left-to-right-Questions',
          { x: ctx.conditions?.sm ? 150 : 300, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            delay: 0.4,
            scrollTrigger: {
              trigger: '.animate-left-to-right-Questions',
            },
          }
        )
      }
    )
  })
  return (
    <section
      className="flex flex-col pb-10 pt-8 md:pt-0 lg:flex-row lg:pb-20"
      id="questions"
    >
      <div className="animate-right-to-left-Questions lg:w-1/3">
        <h3 className="mb-2 text-lg font-medium text-[#323232] lg:text-2xl">
          {t.questions?.title}
        </h3>
        <DoYouNeedHelp t={t} className="hidden lg:flex" />
      </div>

      <div className="animate-left-to-right-Questions lg:w-2/3">
        <div className="flex w-full max-w-[824px] flex-col items-end gap-4 2xl:max-w-full">
          <CollapsibleComponent items={items} />
        </div>
      </div>
      <DoYouNeedHelp t={t} className="mt-9 text-center lg:hidden" />
    </section>
  )
}

export default Questions

const DoYouNeedHelp = ({ className, t }: { className?: string; t: any }) => {
  return (
    <span className={cn('flex flex-col gap-2', className)}>
      <span>{t?.questions?.subtitle}</span>
      <Link
        href="tel:+37360851555"
        className="text-base text-blue-500 underline"
      >
        {t.questions?.call}: +37360 851 555
      </Link>
    </span>
  )
}

const items = [
  {
    title: {
      ro: 'Cum pot să rezerv un bilet de avion pe acest website?',
      ru: 'Как я могу забронировать билет на этом сайте?',
    },
    text: {
      ro: 'Pentru a rezerva un bilet de avion, pur și simplu accesează pagina noastră de rezervări și introdu detaliile călătoriei tale, inclusiv destinația, datele călătoriei și numărul de pasageri. Apoi, selectează opțiunea dorită și finalizează plata pentru a confirma rezervarea.',
      ru: 'Чтобы забронировать билет на самолёт, просто перейдите на нашу страницу бронирования и введите данные о вашем путешествии, включая пункт назначения, даты поездки и количество пассажиров. Затем выберите желаемую опцию и завершите оплату для подтверждения бронирования.',
    },
  },
  {
    title: {
      ro: 'Ce opțiuni de plată sunt acceptate pentru biletele de avion?',
      ru: 'Какие способы оплаты принимаются для авиабилетов?',
    },
    text: {
      ro: 'Acceptăm diverse metode de plată, inclusiv carduri de credit/debit și plăți online securizate. Detaliile despre opțiunile de plată disponibile vor fi afișate în timpul procesului de rezervare.',
      ru: 'Мы принимаем различные способы оплаты, включая кредитные/дебетовые карты и безопасные онлайн-платежи. Детали доступных способов оплаты будут отображаться в процессе бронирования.',
    },
  },
  {
    title: {
      ro: 'Pot să modific sau să anulez o rezervare deja efectuată?',
      ru: 'Могу ли я изменить или отменить уже сделанное бронирование?',
    },
    text: {
      ro: 'Da, în majoritatea cazurilor, poți să modifici sau să anulezi o rezervare deja efectuată, în funcție de politica companiei aeriene și de condițiile tarifare aplicabile. Te rugăm să consulți secțiunea noastră de Politici și Termeni și Condiții pentru mai multe informații sau să ne contactezi pentru asistență.',
      ru: 'Да, в большинстве случаев вы можете изменить или отменить уже сделанное бронирование, в зависимости от политики авиакомпании и применимых тарифных условий. Пожалуйста, ознакомьтесь с нашим разделом о Политиках и Условиях или свяжитесь с нами для получения помощи.',
    },
  },
  {
    title: {
      ro: 'Ce fac dacă întâmpin probleme sau întârzieri în timpul călătoriei mele?',
      ru: 'Что делать, если я столкнусь с проблемами или задержками во время путешествия?',
    },
    text: {
      ro: 'În cazul unor probleme sau întârzieri în timpul călătoriei tale, te rugăm să contactezi echipa noastră de suport clienți, disponibilă 24/7. Vom face tot posibilul pentru a te asista și a rezolva situația în cel mai eficient mod posibil.',
      ru: 'Если возникнут проблемы или задержки во время вашего путешествия, пожалуйста, свяжитесь с нашей службой поддержки клиентов, которая работает круглосуточно. Мы сделаем все возможное, чтобы помочь вам и решить ситуацию самым эффективным способом.',
    },
  },
  {
    title: {
      ro: 'Care sunt beneficiile de a rezerva bilete de avion prin intermediul acestei agenții?',
      ru: 'Какие преимущества бронирования билетов через это агентство?',
    },
    text: {
      ro: 'Rezervând bilete de avion prin intermediul agenției noastre, beneficiezi de acces la tarife competitive, oferte exclusive și o gamă largă de opțiuni de zbor. În plus, oferim suport clienți dedicat și servicii personalizate pentru a-ți asigura o experiență de călătorie fără probleme.',
      ru: 'Бронируя авиабилеты через наше агентство, вы получаете доступ к конкурентоспособным тарифам, эксклюзивным предложениям и широкому выбору рейсов. Кроме того, мы предлагаем персонализированную клиентскую поддержку и услуги, чтобы обеспечить вам безупречное путешествие.',
    },
  },
]
