'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import offers from '@/assets/img/offers.jpg'
import CollapsibleBlock from './collapsible-block'
import { Card, CardContent, CardHeader } from './ui/card'
import { offers as offersList } from '../data/data'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Offers = () => {
  const container = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          sm: '(max-width: 767px)',
          md: '(min-width: 768px)',
        },
        (ctx) => {
          const { sm }: any = ctx.conditions
          gsap.fromTo(
            '.animate-right-to-left',
            { x: sm ? -20 : -150, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              delay: 0.4,
              scrollTrigger: {
                trigger: '.animate-right-to-left',
              },
            }
          )

          gsap.fromTo(
            '.animate-left-to-right',
            { x: sm ? 100 : 300, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              delay: 0.4,
              scrollTrigger: {
                trigger: '.animate-left-to-right',
              },
            }
          )
        }
      )
    },
    { scope: container }
  )
  const [currentOpenedAccortion, setCurrentOpenedAccortion] = useState(
    offersList[0].title
  )

  const isOpen = (title: string) => title === currentOpenedAccortion

  return (
    <section
      className="animation-trigger mt-24 overflow-x-hidden lg:mt-44"
      ref={container}
    >
      <h2 className="mb-6 text-2xl font-medium">
        Cele mai populare destinatii
      </h2>

      <div className="animate-right-to-left flex gap-6">
        <div className="hidden w-2/6 lg:block">
          <Card className="mb-4 rounded-xl">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-medium">Chisinau - Roma</h3>
            </CardHeader>
            <CardContent>
              <p className="pb-6 text-base font-light">
                Este un oraș plin de istorie și cultură, cu obiective turistice
                celebre, cum ar fi Colosseum, Vatican și Fontana di Trevi.
              </p>
              {/* <Link className="text-blue-700 underline" href="">
                Mai multe detalii
              </Link> */}
            </CardContent>
          </Card>
          <div className="h-[280px] w-full rounded-2xl">
            <Image className="w-full object-cover" src={offers} alt="image" />
          </div>
        </div>

        <div className="animate-left-to-right w-full lg:w-4/6">
          {offersList.map((offer, index) => (
            <div key={index}>
              <CollapsibleBlock
                isOpen={isOpen}
                setIsOpen={(title: string) => setCurrentOpenedAccortion(title)}
                offer={offer}
              />
              {index !== 5 && (
                <div className="flex justify-center">
                  <hr className="my-3 h-0 w-[90%] border-t-0 border-t-gray-200 lg:border-t" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offers
