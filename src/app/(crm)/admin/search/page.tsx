'use client'

import React, { useState } from 'react'
import { Segmented } from 'antd'
import { SearchTable } from '@/app/(crm)/admin/search/SearchTable'
import { FlightsTabs } from '@/components/flights/flights-tabs'
import { SearchBar } from '@/components/search-bar'
import { AdminPanelReservationModal } from './AdminPanelReservationModal'

export default function Search() {
  const [activeTab, setActiveTab] = useState('Results')
  const [loading, setLoading] = useState(false)
  const [isNoFlights, setIsNoFlights] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isSorting, setIsSorting] = useState(true)

  const handleChangeLoading = (value: boolean) => {
    setLoading(value)
  }
  const handleAdminPanelReservation = () => setShowModal(true)

  return (
    <div>
      <div className="mb-20 flex w-full flex-col items-center justify-center gap-8">
        <SearchBar
          setLoading={handleChangeLoading}
          setIsNoFlights={setIsNoFlights}
        />
        <Segmented
          onChange={(value) => setActiveTab(value)}
          options={['Results', 'History']}
          value={activeTab}
        />
      </div>

      {activeTab === 'Results' ? (
        <>
          <FlightsTabs
            loading={loading}
            isNoFlights={isNoFlights}
            className="-mt-16"
            isSorting={isSorting}
            setIsSorting={setIsSorting}
            handleAdminPanelReservation={handleAdminPanelReservation}
          />
          <AdminPanelReservationModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      ) : (
        <SearchTable />
      )}
    </div>
  )
}
