import React from 'react'
import { cn } from '@/lib/utils'

interface IReservationCardProps {
  children: React.ReactNode
  className?: string
  [x: string]: any
}

export const ReservationCard = (props: IReservationCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        'custom-shadow mt-2 rounded-2xl bg-white px-3 py-6 lg:mt-4 lg:p-10',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
