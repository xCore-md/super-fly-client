'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'
import { searchFields, SearchFields } from '@/lib/constants'

interface ReservationContextProps {
  reservation: SearchFields
  setReservation: React.Dispatch<React.SetStateAction<SearchFields>>
}

export const ReservationContext = createContext<ReservationContextProps>({
  reservation: searchFields,
  setReservation: () => {},
})

interface ReservationContextProviderProps {
  children: ReactNode
}

export function ReservationContextProvider({
  children,
}: ReservationContextProviderProps) {
  const [reservation, setReservation] = useState<SearchFields>(searchFields)

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservationContext = () => useContext(ReservationContext)
