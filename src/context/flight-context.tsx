'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'
import { searchFields, SearchFields } from '@/lib/constants'

interface FlightContextProps {
  flight: SearchFields
  setFlight: React.Dispatch<React.SetStateAction<SearchFields>>
}

export const FlightContext = createContext<FlightContextProps>({
  flight: searchFields,
  setFlight: () => {},
})

interface FlightContextProviderProps {
  children: ReactNode
}

export function FlightContextProvider({
  children,
}: FlightContextProviderProps) {
  const [flight, setFlight] = useState<SearchFields>(searchFields)

  return (
    <FlightContext.Provider value={{ flight, setFlight }}>
      {children}
    </FlightContext.Provider>
  )
}

export const useFlightContext = () => useContext(FlightContext)
