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
        'mt-14 rounded-2xl bg-white px-3 py-6 shadow-md lg:p-10',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
