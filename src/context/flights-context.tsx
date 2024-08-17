'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface FlightsContextProps {
  flights: []
  originalFlights: []
  setFlights: any
  setOriginalFlights: any
  initialFlights: []
  setInitialFlights: any
  selectedFlight: {}
  setSelectedFlight: any
}

export const FlightsContext = createContext<FlightsContextProps>({
  flights: [],
  originalFlights: [],
  setFlights: () => [],
  setOriginalFlights: () => {},
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
  const [originalFlights, setOriginalFlights] = useState<[]>([])
  const [initialFlights, setInitialFlights] = useState<[]>([])
  const [selectedFlight, setSelectedFlight] = useState<{}>({})

  return (
    <FlightsContext.Provider
      value={{
        flights,
        originalFlights,
        initialFlights,
        setInitialFlights,
        setFlights,
        setOriginalFlights,
        selectedFlight,
        setSelectedFlight,
      }}
    >
      {children}
    </FlightsContext.Provider>
  )
}

export const useFlightsContext = () => useContext(FlightsContext)
