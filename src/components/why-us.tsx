'use client'

import Image from 'next/image'
import { Popover } from 'antd'
import why1 from '@/assets/img/why1.svg'
import why2 from '@/assets/img/why2.svg'
import why3 from '@/assets/img/why3.svg'
import why4 from '@/assets/img/why4.svg'
import why5 from '@/assets/img/why5.svg'
import why6 from '@/assets/img/why6.svg'
import { useAnimationFadeIn } from '@/lib/hooks/useAnimationFadeIn'

export const WhyUs = ({ title }: { title: string }) => {
  useAnimationFadeIn('.animation')

  const items = [
    {
      image: why1,
      title: 'Siguranță',
      text: 'Pentru noi, siguranța călătorilor noștri este prioritatea noastră numărul unu. Colaborăm cu companii aeriene de încredere și respectăm cele mai înalte standarde de siguranță pentru a asigura că fiecare zbor este unul fără probleme și în deplină siguranță.',
    },
    {
      image: why2,
      title: 'Comfort',
      text: 'Când alegi să călătorești cu noi, confortul tău este garantat. Colaborăm cu companii aeriene care oferă servicii premium și facilități care îți asigură că fiecare călătorie este una plăcută și relaxantă, indiferent de destinație sau durata zborului.',
    },
    {
      image: why3,
      title: 'Eficiență',
      text: 'Suntem dedicați să oferim cele mai eficiente servicii posibile. Cu sistemul nostru de rezervare online simplu și rapid, poți rezerva bilete în doar câteva minute. Echipa noastră de profesioniști lucrează neîncetat pentru a te ajuta să găsești cele mai bune opțiuni de zbor pentru nevoile tale.',
    },
    {
      image: why4,
      title: 'Support 24/7',
      text: 'Indiferent de momentul în care ai nevoie de ajutor, echipa noastră este disponibilă non-stop pentru a te asista. Cu suportul nostru 24/7, poți fi sigur că vei primi ajutor și răspunsuri la întrebările tale în orice moment al zilei sau nopții.',
    },
    {
      image: why5,
      title: 'Rapiditate',
      text: 'Când vine vorba de rezervarea biletelor de avion, timpul este esențial. Su, îți garantăm că vei beneficia de cele mai rapide servicii. Cu opțiuni de căutare și rezervare rapide și eficiente, vei putea să-ți planifici călătoria în cel mai scurt timp posibil.',
    },
    {
      image: why6,
      title: 'Oferte Exclusive',
      text: 'Ca membru al agenției noastre, te vei bucura de acces la oferte exclusive și promoții speciale. Îți oferim cele mai bune prețuri disponibile și opțiuni personalizate pentru a-ți transforma călătoria într-o experiență de neuitat, fără să îți golească portofelul.',
    },
  ]
  return (
    <>
      <div className="mb-4 flex flex-col items-center md:mb-14">
        <h3 className="text-lg font-medium md:mb-2 lg:text-2xl lg:font-normal">
          {title}
        </h3>
        <p className="hidden text-center text-sm font-light text-gray-700 md:block lg:text-base">
          Oferim clienților noștri cele mai bune tarife pentru bilete de avion,
          <br />
          suport gratuit 24 de ore și o experiență simplă și convenabilă de
          rezervare.
        </p>
      </div>
      <div className="animation grid grid-cols-3 gap-x-4 gap-y-4 md:gap-x-10">
        {items.map(({ image, title, text }) => (
          <Component key={title} image={image} title={title} text={text} />
        ))}
      </div>
    </>
  )
}

interface IComponentProps {
  title: string
  image: string
  text: string
}

const Component = ({ title, image, text }: IComponentProps) => {
  return (
    <div>
      <div
        key={title}
        className="hidden h-full flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 fill-mode-forwards lg:flex lg:flex-row lg:items-start lg:gap-6 lg:p-6"
      >
        <Image src={image} alt="icon" className="max-w-10 lg:max-w-none" />
        <div>
          <h4 className="text-center text-xxs font-medium text-[#323232] lg:mb-3 lg:text-left lg:text-[22px]">
            {title}
          </h4>
          <span className="hidden text-sm text-[#6C6C6C] lg:block">{text}</span>
        </div>
      </div>

      <Popover
        className="z-30 lg:hidden"
        overlayClassName="z-30"
        trigger="click"
        content={
          <div className=" max-w-52">
            <span className="text-sm text-gray-500">{text}</span>
          </div>
        }
      >
        <div className="flex h-full flex-col items-center justify-start gap-3 rounded-lg border border-gray-200 bg-white p-4 fill-mode-forwards">
          <Image src={image} alt="icon" className="max-w-10 lg:max-w-none" />
          <div>
            <h4 className="text-center text-xxs font-medium lg:mb-3 lg:text-left lg:text-xl">
              {title}
            </h4>
          </div>
        </div>
      </Popover>
    </div>
  )
}
