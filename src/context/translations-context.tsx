'use client'

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import ro from '@/data/translations/ro.json'
import ru from '@/data/translations/ru.json'

interface TranslationsContextProps {
  lang: string
  translations: {}
  setLang: React.Dispatch<React.SetStateAction<string>>
}

export const TranslationsContext = createContext<TranslationsContextProps>({
  lang: '',
  translations: {},
  setLang: () => {},
})

interface TranslationsContextProviderProps {
  children: ReactNode
}

export function TranslationsContextProvider({
  children,
}: TranslationsContextProviderProps) {
  const [lang, setLang] = useState<string>('ro')
  const [translations, setTranslations] = useState<any>({})

  useEffect(() => {
    if (lang === 'ro') setTranslations(ro)
    if (lang === 'ru') setTranslations(ru)
  }, [lang])

  return (
    <TranslationsContext.Provider value={{ lang, setLang, translations }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export const useTranslationsContext = () =>
  useContext(TranslationsContext) as any
