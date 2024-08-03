'use client'

import { useState } from 'react'
import { SearchBar } from '@components/search-bar'
import { Button } from '@components/ui/button'

export const SearchBarWithTabs = ({
  setLoading,
}: {
  // eslint-disable-next-line
  setLoading?: (loading: boolean) => void
}) => {
  const [activeTab, setActiveTab] = useState('dus')

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <Button
          className={`h-[22px] rounded-xl p-4 text-sm font-semibold max-[1024px]:text-xs ${activeTab === 'dus' ? '' : 'text-white'}`}
          variant={activeTab === 'dus' ? 'secondary' : 'ghost'}
          onClick={() => handleChangeTab('dus')}
        >
          Tur
        </Button>
        <Button
          className={`h-[22px] rounded-xl p-4 text-sm font-semibold max-[1024px]:text-xs ${activeTab === 'intors' ? '' : 'text-white'}`}
          variant={activeTab === 'intors' ? 'secondary' : 'ghost'}
          onClick={() => handleChangeTab('intors')}
        >
          Tur-Retur
        </Button>
      </div>

      <SearchBar
        setLoading={setLoading}
        setActiveTab={setActiveTab}
        tab={activeTab}
      />
    </div>
  )
}
