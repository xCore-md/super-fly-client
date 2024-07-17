'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface FlightsContextProps {
  flights: []
  setFlights: any
  initialFlights: []
  setInitialFlights: any
  selectedFlight: {}
  setSelectedFlight: any
}

export const FlightsContext = createContext<FlightsContextProps>({
  flights: [],
  setFlights: () => [],
  initialFlights: [],
  setInitialFlights: () => [],
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
  const [initialFlights, setInitialFlights] = useState<[]>([])
  const [selectedFlight, setSelectedFlight] = useState<{}>({})

  return (
    <FlightsContext.Provider
      value={{
        flights,
        initialFlights,
        setInitialFlights,
        setFlights,
        selectedFlight,
        setSelectedFlight,
      }}
    >
      {children}
    </FlightsContext.Provider>
  )
}

export const useFlightsContext = () => useContext(FlightsContext)
