'use client'

import React, { useState } from 'react'
import { Segmented } from 'antd'
import { SearchTable } from '@/app/(crm)/admin/search/SearchTable'
import { FlightsTabs } from '@/components/flights/flights-tabs'
import { SearchBar } from '@/components/search-bar'

export default function Search() {
  const [activeTab, setActiveTab] = useState('Results')
  const [loading, setLoading] = useState(false)

  const handleChangeLoading = (value: boolean) => {
    setLoading(value)
  }

  return (
    <div>
      <div className="mb-20 flex w-full flex-col items-center justify-center gap-8">
        <SearchBar arrival={true} setLoading={handleChangeLoading} />
        <Segmented
          onChange={(value) => setActiveTab(value)}
          options={['Results', 'History']}
          value={activeTab}
        />
      </div>

      {activeTab === 'Results' ? (
        <FlightsTabs loading={loading} className="-mt-16" />
      ) : (
        <SearchTable />
      )}
    </div>
  )
}
