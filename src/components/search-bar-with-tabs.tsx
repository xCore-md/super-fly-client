'use client'

import { useState } from 'react'
import { SearchBar } from '@components/search-bar'

export const SearchBarWithTabs = ({
  setLoading,
}: {
  // eslint-disable-next-line
  setLoading?: (loading: boolean) => void
}) => {
  const [isReturnFlight, setIsReturnFlight] = useState(false)

  const handleChangeTab = (tab: boolean) => {
    setIsReturnFlight(tab)
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <button
          className={`rounded-lg px-4 text-[8px]  font-semibold md:h-[22px] md:text-xxs ${isReturnFlight ? 'text-slate-400 md:text-white' : 'text-white md:bg-white md:text-black'}`}
          onClick={() => handleChangeTab(false)}
        >
          Într-o direcție
        </button>
        <button
          className={`rounded-lg px-4 text-[8px] font-semibold md:text-xxs ${isReturnFlight ? 'text-white md:bg-white md:text-black' : 'text-slate-400 md:text-white'}`}
          onClick={() => handleChangeTab(true)}
        >
          Tur-Retur
        </button>
      </div>

      <SearchBar setLoading={setLoading} setIsReturnFlight={handleChangeTab} />
    </div>
  )
}
