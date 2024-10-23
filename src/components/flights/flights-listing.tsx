'use client'

import { usePathname } from 'next/navigation'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useFlightsContext } from '@/context/flights-context'
import { useIsAdminPanel } from '@/lib/hooks/useIsAdminPanel'
import { FlyContent } from './fly-content'

interface IFlightsListingProps {
  length: number
  flightsToShow: number
  margin?: string
  withoutAction?: boolean
  withoutFlightNumber?: boolean
  withoutHeader?: boolean
  withoutFooter?: boolean
  pricePlacement?: 'top' | 'bottom'
  handleAdminPanelReservation?: () => void
}

export const FlightsListing = (props: IFlightsListingProps) => {
  const pathname = usePathname()
  const { flights, setSelectedFlight } = useFlightsContext()
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const isAdminPanel = useIsAdminPanel()

  const data = pathname === '/reservation' ? flights?.slice(0, 3) : flights
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    const elements = elementsRef.current.filter(
      (el) => el !== null
    ) as HTMLDivElement[]

    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: 'easeOut' }
      )
    }
  })

  const setRef = (el: HTMLDivElement | null, index: number) => {
    elementsRef.current[index] = el
  }

  const handleAdminPanelSetSelectedFlight = (flight: object) => {
    setSelectedFlight(flight)
    if (props.handleAdminPanelReservation) {
      props.handleAdminPanelReservation()
    }
  }

  if (!data?.length) return

  return data
    ?.slice(0, props.flightsToShow)
    .map((flight: any, index: number) => (
      <div
        key={index}
        ref={(el) => setRef(el, index)}
        className={`custom-shadow group mb-[18px] grid w-full grid-cols-2 items-center rounded-2xl bg-white p-4 lg:mb-11 lg:grid-cols-5 lg:gap-5 ${props.margin}`}
      >
        <FlyContent
          {...props}
          flight={flight}
          isAdminPanel={isAdminPanel}
          handleAdminPanelSetSelectedFlight={handleAdminPanelSetSelectedFlight}
        />
      </div>
    ))
}
