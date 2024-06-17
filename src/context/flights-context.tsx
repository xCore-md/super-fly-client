'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface FlightsContextProps {
  flights: []
  setFlights: React.Dispatch<React.SetStateAction<[]>>
}

export const FlightsContext = createContext<FlightsContextProps>({
  flights: [],
  setFlights: () => [],
})

interface FlightsContextProviderProps {
  children: ReactNode
}

export function FlightsContextProvider({
  children,
}: FlightsContextProviderProps) {
  const [flights, setFlights] = useState<[]>([])

  return (
    <FlightsContext.Provider value={{ flights, setFlights }}>
      {children}
    </FlightsContext.Provider>
  )
}

export const useFlightsContext = () => useContext(FlightsContext)
