import React from 'react'
import { cn } from '@/lib/utils'

interface IReservationCardProps {
  children: React.ReactNode
  className?: string
}

export const ReservationCard = (props: IReservationCardProps) => {
  return (
    <div
      className={cn(
        'custom-shadow mt-4 rounded-2xl bg-white px-3 py-6 lg:p-10',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
