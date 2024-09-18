'use client'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import CollapsibleComponent from './collapsible-component'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Questions = () => {
  const items = [
    {
      title: 'Cum pot să rezerv un bilet de avion pe acest website?',
      text: 'Pentru a rezerva un bilet de avion, pur și simplu accesează pagina noastră de rezervări și introdu detaliile călătoriei tale, inclusiv destinația, datele călătoriei și numărul de pasageri. Apoi, selectează opțiunea dorită și finalizează plata pentru a confirma rezervarea.',
    },
    {
      title: 'Ce opțiuni de plată sunt acceptate pentru biletele de avion?',
      text: 'Acceptăm diverse metode de plată, inclusiv carduri de credit/debit și plăți online securizate. Detaliile despre opțiunile de plată disponibile vor fi afișate în timpul procesului de rezervare.',
    },
    {
      title: 'Pot să modific sau să anulez o rezervare deja efectuată?',
      text: 'Da, în majoritatea cazurilor, poți să modifici sau să anulezi o rezervare deja efectuată, în funcție de politica companiei aeriene și de condițiile tarifare aplicabile. Te rugăm să consulți secțiunea noastră de Politici și Termeni și Condiții pentru mai multe informații sau să ne contactezi pentru asistență.',
    },
    {
      title:
        'Ce fac dacă întâmpin probleme sau întârzieri în timpul călătoriei mele?',
      text: 'În cazul unor probleme sau întârzieri în timpul călătoriei tale, te rugăm să contactezi echipa noastră de suport clienți, disponibilă 24/7. Vom face tot posibilul pentru a te asista și a rezolva situația în cel mai eficient mod posibil.',
    },
    {
      title:
        'Care sunt beneficiile de a rezerva bilete de avion prin intermediul acestei agenții?',
      text: 'Rezervând bilete de avion prin intermediul agenției noastre, beneficiezi de acces la tarife competitive, oferte exclusive și o gamă largă de opțiuni de zbor. În plus, oferim suport clienți dedicat și servicii personalizate pentru a-ți asigura o experiență de călătorie fără probleme.',
    },
  ]
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
      className="flex flex-col pb-10 pt-16 lg:flex-row lg:pb-20"
      id="questions"
    >
      <div className="animate-right-to-left-Questions lg:w-1/3">
        <h3 className="mb-2 text-lg font-medium lg:text-xl">
          Întrebări frecvente
        </h3>
        <p className="mb-8 text-sm font-light text-gray-700 lg:text-base">
          Lorem ipsum dolor sit amet consectetur. <br /> Mattis pretium
          pellentesque tincidunt quam
        </p>

        <DoYouNeedHelp className="hidden lg:flex" />
      </div>

      <div className="animate-left-to-right-Questions lg:w-2/3">
        <div className="flex flex-col gap-4">
          <CollapsibleComponent items={items} />
        </div>
      </div>
      <DoYouNeedHelp className="mt-9 text-center lg:hidden" />
    </section>
  )
}

export default Questions

const DoYouNeedHelp = ({ className }: { className?: string }) => {
  return (
    <span className={cn('flex flex-col gap-2', className)}>
      <span>Ai Nevoie de Ajutor?</span>
      <Link
        href="tel:+37360851555"
        className="text-base text-blue-500 underline"
      >
        Suna: +37360 851 555
      </Link>
    </span>
  )
}
