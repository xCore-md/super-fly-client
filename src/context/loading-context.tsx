'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface LoadingContextProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => {},
})

interface LoadingContextProviderProps {
  children: ReactNode
}

export function LoadingContextProvider({
  children,
}: LoadingContextProviderProps) {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => useContext(LoadingContext)
