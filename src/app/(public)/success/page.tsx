'use client'

import Link from 'next/link'
import { Result, Button } from 'antd'
import { useTranslationsContext } from '@/context/translations-context'

export default function SuccessPage() {
  const { lang } = useTranslationsContext()

  return (
    <div className="container py-16">
      <Result
        status="success"
        title={info.title[lang]}
        subTitle={
          <span dangerouslySetInnerHTML={{ __html: info.subtitle[lang] }} />
        }
        extra={[
          <Link href="/" key={info.btnLabel[lang]}>
            <Button type="primary" className="bg-brand-blue">
              {info.btnLabel[lang]}
            </Button>
          </Link>,
        ]}
      />
    </div>
  )
}

const info: any = {
  title: {
    ro: 'Achitat cu succes',
    ru: 'Успешно оплачено',
  },
  subtitle: {
    ro: 'Mersi ca ai ales sa calatoresti cu noi. Rezervarea ta a fost inregistrata cu succes. <br /> Vei primi un email cu detaliile rezervarii in cel mai scurt timp.',
    ru: 'Спасибо за то, что выбрали нас. Ваша бронь успешно зарегистрирована. <br /> Вы получите электронное письмо с деталями бронирования в ближайшее время.',
  },
  btnLabel: {
    ro: 'Returneaza la pagina principala',
    ru: 'Вернуться на главную страницу',
  },
}
