import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from '@components/ui/progress'

export function ReservationTimer() {
  const [countDownProgress, setCountDownProgress] = useState(900)

  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDownProgress((prev) => {
        if (prev <= 0) {
          router.push('/')
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <p className="mt-9 text-center text-lg font-bold lg:text-left">
        Prețul expiră în:
        <span className="ml-1 text-red-600">
          {formatTime(countDownProgress)}
        </span>
      </p>

      <Progress
        value={(countDownProgress / 900) * 100}
        progressClassName="bg-red-600 "
        className="mt-4 h-0.5 w-[100%] bg-[#E7E7E7]"
        showRectangle
      />

      <p className="mt-3 text-xxs text-[#9D9D9D]">
        <span className="font-bold">Economisești timp și bani:</span> Exemplu
        text, in care va fi indicat anuntul despre disponibilitatea pretului, si
        propunerea de a rezerva acum, pentru a nu pierde oferta la pret.
      </p>
    </>
  )
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}m : ${seconds}s`
}
