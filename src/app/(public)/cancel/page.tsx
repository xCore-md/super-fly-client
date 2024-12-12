'use client'

import Link from 'next/link'
import { Button, Result } from 'antd'
import { useTranslationsContext } from '@/context/translations-context'

export default function CancelPage() {
  const { lang } = useTranslationsContext()

  return (
    <div className="container py-16">
      <Result
        status="error"
        title={info.title[lang]}
        subTitle={info.subtitle[lang]}
        extra={[
          <Link href="/" key="back">
            <Button
              type="primary"
              className=" mb-4 bg-brand-blue lg:mb-0"
              key="console"
            >
              {info.btnBackLabel[lang]}
            </Button>
          </Link>,
          <Link href="tel:+(373) 60 851 555" key="contact">
            <Button key="buy">{info.btnContactLabel[lang]}</Button>
          </Link>,
        ]}
      />
    </div>
  )
}

const info: any = {
  title: {
    ro: 'Achitarea a fost anulată',
    ru: 'Оплата отменена',
  },
  subtitle: {
    ro: 'Dacă aveți întrebări, nu ezitați să ne contactați.',
    ru: 'Если у вас есть вопросы, не стесняйтесь обращаться к нам.',
  },
  btnBackLabel: {
    ro: 'Înapoi la pagina principală',
    ru: 'Вернуться на главную страницу',
  },
  btnContactLabel: {
    ro: 'Contactează-ne',
    ru: 'Свяжитесь с нами',
  },
}
