import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { Progress } from '@components/ui/progress'
import { useTranslationsContext } from '@/context/translations-context'

export function ReservationTimer() {
  const [countDownProgress, setCountDownProgress] = useState(900)
  const [openModal, setOpenModal] = useState(false)
  const { lang, translations: t } = useTranslationsContext()

  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDownProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          setOpenModal(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [countDownProgress])

  return (
    <>
      <Modal
        open={openModal}
        centered
        onClose={() => router.push('/flights')}
        title={<h4 className="text-lg">{t.sessionSoonExpiring}</h4>}
        okText={
          <div>
            {t.continue} <ArrowRightOutlined />
          </div>
        }
        onOk={() => {
          setOpenModal(false)
          setCountDownProgress(450)
        }}
        cancelText={
          <div>
            {t.search} <SearchOutlined />
          </div>
        }
        onCancel={() => router.push('/flights')}
      >
        <div className="mt-4 pb-4">
          <p className="text-base">
            {popOverTranslations.expiringMessage[lang]}
          </p>
        </div>
      </Modal>
      <p className="mt-9 text-center text-lg font-semibold">
        {t.priceExpiringIn}:
        <span className="ml-1 font-bold text-red-600">
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
        <span className="font-bold">
          {popOverTranslations.saveCashAndTime[lang]}:
        </span>{' '}
        {popOverTranslations.saveCashAndTimeMessage[lang]}
      </p>
    </>
  )
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}m : ${seconds}s`
}

const popOverTranslations: any = {
  expiringMessage: {
    ro: 'Ne pare rǎu, sesiunea dumneavoastrǎ este pe punctul de a expira din cauza inactivitǎții. Incǎ mai puteți continua rezervarea actualǎ sau puteți începe o nouǎ căutare.',
    ru: 'Извините, ваша сессия скоро истечет из-за неактивности. Вы можете продолжить текущее бронирование или начать новый поиск.',
  },
  saveCashAndTime: {
    ro: 'Economisești timp și bani:',
    ru: 'Экономьте время и деньги:',
  },
  saveCashAndTimeMessage: {
    ro: 'Exemplu text, in care va fi indicat anuntul despre disponibilitatea pretului, si propunerea de a rezerva acum, pentru a nu pierde oferta la pret.',
    ru: 'Пример текста, в котором будет указано объявление о доступности цены и предложение забронировать сейчас, чтобы не упустить предложение по цене.',
  },
}
