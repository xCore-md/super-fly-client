'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface FlightTypeContextProps {
  flightType: number
  setFlightType: React.Dispatch<React.SetStateAction<number>>
}

export const FlightTypeContext = createContext<FlightTypeContextProps>({
  flightType: 0,
  setFlightType: () => {},
})

interface FlightTypeContextProviderProps {
  children: ReactNode
}

export function FlightTypeContextProvider({
  children,
}: FlightTypeContextProviderProps) {
  const [flightType, setFlightType] = useState(0)

  return (
    <FlightTypeContext.Provider value={{ flightType, setFlightType }}>
      {children}
    </FlightTypeContext.Provider>
  )
}

export const useFlightTypeContext = () => useContext(FlightTypeContext)
