'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface FlightsContextProps {
  flights: []
  setFlights: React.Dispatch<React.SetStateAction<[]>>
  selectedFlight: {}
  setSelectedFlight: React.Dispatch<React.SetStateAction<{}>>
}

export const FlightsContext = createContext<FlightsContextProps>({
  flights: [],
  setFlights: () => [],
  selectedFlight: {},
  setSelectedFlight: () => {},
})

interface FlightsContextProviderProps {
  children: ReactNode
}

export function FlightsContextProvider({
  children,
}: FlightsContextProviderProps) {
  const [flights, setFlights] = useState<[]>([])
  const [selectedFlight, setSelectedFlight] = useState<{}>({})

  return (
    <FlightsContext.Provider
      value={{ flights, setFlights, selectedFlight, setSelectedFlight }}
    >
      {children}
    </FlightsContext.Provider>
  )
}

export const useFlightsContext = () => useContext(FlightsContext)
