'use client'

import { useEffect, useState } from 'react'
import { useFlightTypeContext } from '@/context/flight-type-context'
import { SearchBar } from '@components/search-bar'
import { useTranslationsContext } from '@/context/translations-context'

export const SearchBarWithTabs = ({
  setLoading,
}: {
  // eslint-disable-next-line
  setLoading?: (loading: boolean) => void
}) => {
  const [isReturnFlight, setIsReturnFlight] = useState(false)
  const { setFlightType } = useFlightTypeContext()
  const { translations: t } = useTranslationsContext()

  useEffect(() => {
    const storage = localStorage.getItem('flight')

    if (storage) {
      const flight = JSON.parse(storage)
      if (flight.return_to) {
        setIsReturnFlight(true)
      }
    }
  }, [])

  const handleChangeTab = (tab: boolean) => {
    setIsReturnFlight(tab)
    setFlightType(tab ? 1 : 0)
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <button
          className={`rounded-lg px-4 text-[10px]  font-semibold lg:h-[22px] lg:text-xxs ${isReturnFlight ? 'text-slate-400 lg:text-white' : 'text-white lg:bg-white lg:text-black'}`}
          onClick={() => handleChangeTab(false)}
        >
          {t.searchBar?.oneWay}
        </button>
        <button
          className={`rounded-lg px-4 text-[10px] font-semibold lg:text-xxs ${isReturnFlight ? 'text-white lg:bg-white lg:text-black' : 'text-slate-400 lg:text-white'}`}
          onClick={() => handleChangeTab(true)}
        >
          {t.searchBar?.roundTrip}
        </button>
      </div>

      <SearchBar
        setLoading={setLoading}
        setIsReturnFlight={handleChangeTab}
        isReturnFlight={isReturnFlight}
      />
    </div>
  )
}
