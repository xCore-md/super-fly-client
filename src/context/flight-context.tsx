'use client'

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
} from 'react'
import { searchFields, SearchFields } from '@/lib/constants'

interface FlightContextProps {
  flight: SearchFields
  setFlight: React.Dispatch<React.SetStateAction<SearchFields>>
  searchBarRef: React.MutableRefObject<any>
}

export const FlightContext = createContext<FlightContextProps>({
  flight: searchFields,
  setFlight: () => {},
  searchBarRef: { current: null },
})

interface FlightContextProviderProps {
  children: ReactNode
}

export function FlightContextProvider({
  children,
}: FlightContextProviderProps) {
  const [flight, setFlight] = useState<SearchFields>(searchFields)
  const searchBarRef = useRef(null)
  return (
    <FlightContext.Provider value={{ flight, setFlight, searchBarRef }}>
      {children}
    </FlightContext.Provider>
  )
}

export const useFlightContext = () => useContext(FlightContext)
