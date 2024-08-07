'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ReservationContextProps {
  reservation: any
  setReservation: React.Dispatch<React.SetStateAction<any>>
}

export const ReservationContext = createContext<ReservationContextProps>({
  reservation: {},
  setReservation: () => {},
})

interface ReservationContextProviderProps {
  children: ReactNode
}

export function ReservationContextProvider({
  children,
}: ReservationContextProviderProps) {
  const [reservation, setReservation] = useState<any>({})

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservationContext = () => useContext(ReservationContext)
