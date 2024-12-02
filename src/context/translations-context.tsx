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
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const setLanguageInLocalStorage = (lang: string) => {
    localStorage.setItem('lang', lang)
  }

  useEffect(() => {
    setTranslations(lang === 'ru' ? ru : ro)
    if (!firstLoad) {
      setLanguageInLocalStorage(lang)
    }
    setFirstLoad(false)
  }, [lang])

  useEffect(() => {
    const storageLang = localStorage.getItem('lang')

    if (storageLang) {
      setLang(storageLang)
    } else {
      setLang('ro')
    }
  }, [])

  return (
    <TranslationsContext.Provider value={{ lang, setLang, translations }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export const useTranslationsContext = () =>
  useContext(TranslationsContext) as any
