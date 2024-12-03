'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import eightKgSvg from '@/assets/img/bags/8Kg.svg'
import bag from '@/assets/img/bags/bag.svg'
import logo from '@/assets/img/logo_ticket.png'
import planeArrival from '@/assets/img/plane-arrival.png'
import planeDeparture from '@/assets/img/plane-departure.png'
import { useTranslationsContext } from '@/context/translations-context'
import axs from '@/lib/axios'
import { getFlightTime, getPassengerAge } from '@/lib/utils'

export default function TicketPage() {
  const [passengerData, setPassengerData] = useState<any>(null)
  const { lang } = useTranslationsContext()

  useEffect(() => {
    axs
      .get(
        `/ticket/${window.location.search.substring('?passenger_id='.length)}/token/aloha`
      )
      .then((res) => {
        setPassengerData(res.data)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])

  const sale = passengerData?.sale && JSON.parse(passengerData.sale.extra)

  const startDirection = sale?.route.filter((r: any) => r.return === 0)
  const endDirection = sale?.route.filter((r: any) => r.return === 1)
  const directions = endDirection?.length
    ? [startDirection, endDirection]
    : [startDirection]

  const isRulesVisible =
    (startDirection?.length < 3 && endDirection?.length == 0) ||
    (startDirection?.length === 1 && endDirection?.length === 1)

  const rulesFontSize =
    startDirection?.length < 3 && endDirection?.length === 0
      ? 'text-[10px]'
      : 'text-[7px]'

  return (
    <section className="container mx-auto">
      <div className="relative">
        <h2 className="my-10 w-full text-center text-2xl font-medium">
          {info.title[lang]}
        </h2>
        <div className="absolute bottom-0 right-0 flex">
          <Image className=" w-[250px]" src={logo} alt="logo" />
        </div>
      </div>
      {directions.map((routes, index) => (
        <Ticket
          key={index}
          ticketIndex={index}
          passenger={passengerData}
          routes={routes}
          lang={lang}
        />
      ))}
      <div className="mb-6 overflow-hidden rounded-lg">
        <div className="flex justify-between bg-brand-blue pl-20 text-sm font-medium text-white">
          <span className="py-3 uppercase">{info.paymentTime[lang]}</span>
          <span className="py-3 uppercase">{info.paymentMethod[lang]}</span>
          <span className="bg-brand-green px-14 py-3 uppercase">
            {info.total[lang]}
          </span>
        </div>
        <div className="flex justify-between bg-[#EFEFEF] p-5 pl-20 pr-[70px] text-xl font-medium text-slate-600">
          <span>
            {dayjs(passengerData?.sale.created_at).format('DD.MM.YYYY')}
          </span>
          <span className="-translate-x-14">
            {passengerData?.sale.payment_method}
          </span>
          <span>{passengerData?.price_sold || 0} €</span>
        </div>
      </div>
      {isRulesVisible && (
        <div className="overflow-hidden rounded-lg border border-brand-light-blue">
          <div className=" overflow-hidden rounded-lg bg-brand-light-blue p-5 text-base font-semibold text-red-500">
            <p>{info.flightRules[lang]}</p>
          </div>
          <div
            className={`leading-2 flex flex-col p-8 font-normal text-gray-500 ${rulesFontSize}`}
          >
            {rulesText[lang]}
          </div>
        </div>
      )}
    </section>
  )
}

interface ITicketProps {
  passenger?: any
  routes?: any
  ticketIndex?: number
  lang: string
}

const Ticket = ({ passenger, routes, ticketIndex, lang }: ITicketProps) => {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white">
      <div className={`flex justify-between  bg-brand-blue px-5 py-6`}>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">
            {info.firstNameLastName[lang]}
          </p>
          <p className="text-xl font-medium">
            {passenger?.first_name} {passenger?.last_name}
          </p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">{info.dateOfBirth[lang]}</p>
          <p className="text-xl font-medium">
            {dayjs(passenger?.date_of_birth).format('DD.MM.YYYY')}
          </p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">
            {getPassengerAge(passenger?.date_of_birth)}
          </p>
          <p className="text-xl font-medium">1</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">{info.citizenship[lang]}</p>
          <p className="text-xl font-medium">{passenger?.passport_country}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">
            {info.passportNumber[lang]}
          </p>
          <p className="text-xl font-medium">{passenger?.passport_number}</p>
        </div>
        <div className="text-white">
          <p className="mb-3 text-xs font-normal">
            {info.reservationNumber[lang]}
          </p>
          <p className="text-xl font-medium">SF240{passenger?.id}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex h-full w-full items-center  justify-between">
          <div className="w-1/2">
            <div className="flex w-full">
              <div className="relative h-auto w-3">
                <span
                  className={`absolute left-1.5 top-0 z-0 h-full w-px bg-brand-blue`}
                ></span>
                <div className=" flex h-full w-full flex-col items-center justify-between">
                  <span
                    className={`z-40 h-6 w-3 rounded-lg bg-brand-blue`}
                  ></span>
                  {routes?.length > 1 &&
                    routes?.map((r: any, index: number) => (
                      <Tooltip
                        key={index}
                        title={
                          <span className=" flex flex-col gap-2 p-2 text-xs">
                            <span className="flex gap-4">
                              <span className="">{info.transfer[lang]}:</span>{' '}
                              <span className="ml-2 font-semibold">
                                {r.cityFrom} - {r.cityTo}
                              </span>
                            </span>
                            <span className="flex gap-4">
                              <span className="">
                                {info.flightNumber[lang]}:
                              </span>
                              <span className="font-bold">{r.flight_no}</span>
                            </span>
                            <span>{info.takeAndRegisterBaggage[lang]}</span>
                          </span>
                        }
                        className={`z-40 h-6 w-3 rounded-lg  ${index === routes?.length - 1 ? ' bg-brand-yellow' : 'bg-gray-400'}`}
                      ></Tooltip>
                    ))}
                  <span
                    className={`z-40 h-6 w-3 rounded-lg bg-brand-blue`}
                  ></span>
                </div>
              </div>
              <div className="ml-4 flex w-full  flex-col gap-12">
                <div className="relative flex gap-12">
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.from[lang]}
                    </p>
                    <p className="mb-0 text-base font-medium text-black">
                      {routes?.[0].flyFrom}
                    </p>
                    <span className="absolute -bottom-4 text-xs text-gray-500">
                      {routes?.[0].cityFrom}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.date[lang]}
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[0]?.local_departure).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.flightTime[lang]}
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[0]?.local_departure).format('HH:mm')}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.flightNumber[lang]}:
                    </p>
                    <p className="text-base font-semibold text-black">
                      {routes?.[0].flight_no}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div
                    className={`flex h-full w-24 min-w-24 flex-col justify-center ${routes?.length > 1 ? 'gap-14' : ''}`}
                  >
                    {routes?.map((r: any, index: number) => (
                      <div key={index} className="flight_time">
                        <p className="text-xs font-normal text-slate-600">
                          {info.time[lang]}
                        </p>
                        <p className="text-base font-semibold text-black">
                          {getFlightTime(
                            r.local_departure,
                            r.local_arrival,
                            lang
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="absolute -top-6 mr-8 flex max-w-44 gap-4">
                      {routes?.map((r: any, index: number) => (
                        <img
                          key={index}
                          src={`https://api-superfly.xcore.md/logo/${r.airline}`}
                          className={`w-[${100 / routes.length}%] max-w-16`}
                          alt="company"
                        />
                      ))}
                    </span>
                    {ticketIndex === 0 ? (
                      <Image
                        src={planeDeparture}
                        width={700}
                        height={700}
                        className="w-[90%]"
                        alt="airplane"
                      />
                    ) : (
                      <Image
                        src={planeArrival}
                        width={700}
                        height={700}
                        className="w-[90%]"
                        alt="airplane"
                      />
                    )}
                  </div>
                </div>
                <div className="relative flex gap-12">
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.to[lang]}
                    </p>
                    <p className="mb-0 text-base font-medium text-black">
                      {routes?.[routes.length - 1].flyTo}
                    </p>
                    <span className="absolute -bottom-4 text-xs text-gray-500">
                      {routes?.[routes.length - 1].cityTo}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.date[lang]}
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[routes.length - 1].local_arrival).format(
                        'DD.MM.YYYY'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-normal text-slate-600">
                      {info.flightTime[lang]}
                    </p>
                    <p className="text-base font-normal text-slate-600">
                      {dayjs(routes?.[routes.length - 1].local_arrival).format(
                        'HH:mm'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-3/4 items-center border border-brand-blue px-8 py-10">
            <div className="flex h-full items-center gap-4">
              <div className="flex flex-col items-center justify-center ">
                <Image
                  src={eightKgSvg}
                  width={100}
                  height={100}
                  alt="bag"
                  className="mb-2 w-11"
                />

                <span className="mb-1 text-xs font-semibold text-black">
                  {info.personalItem[lang]}
                </span>

                <span className="text-xs font-light text-slate-800">
                  {info.includedFree[lang]}
                </span>
              </div>
              {passenger?.baggage?.length > 0 && (
                <div className="flex h-full items-center gap-8">
                  <span className="px-2 text-3xl">+</span>
                  <div className="flex h-full flex-col items-center justify-center">
                    {passenger?.baggage?.length < 3 && (
                      <Image
                        src={bag}
                        width={100}
                        height={100}
                        alt="bag"
                        className="mb-2 w-11"
                      />
                    )}
                    {passenger?.baggage?.map((b: any, index: number) => (
                      <div
                        key={index}
                        className="flex h-full flex-col items-center justify-center"
                      >
                        <span className="text-sm font-normal text-slate-800">
                          {b.type} X {b.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const info: any = {
  title: {
    ro: 'Ticket de zbor',
    ru: 'Билет на самолет',
  },
  paymentTime: {
    ro: 'Data achitării',
    ru: 'Дата оплаты',
  },
  paymentMethod: {
    ro: 'Modul de achitare',
    ru: 'Способ оплаты',
  },
  total: {
    ro: 'Total Euro',
    ru: 'Итого евро',
  },
  flightRules: {
    ro: 'Reguli de călătorie',
    ru: 'Правила путешествия',
  },
  firstNameLastName: {
    ro: 'Nume/Prenume Pasager',
    ru: 'Имя/Фамилия Пассажира',
  },
  dateOfBirth: {
    ro: 'Data, Luna, Anul Nașterii',
    ru: 'Дата, Месяц, Год Рождения',
  },
  age: {
    ro: 'Vârsta',
    ru: 'Возраст',
  },
  citizenship: {
    ro: 'Cetățenia',
    ru: 'Гражданство',
  },
  passportNumber: {
    ro: 'Număr Pașaport',
    ru: 'Номер паспорта',
  },
  reservationNumber: {
    ro: 'Număr de rezervare',
    ru: 'Номер бронирования',
  },
  from: {
    ro: 'De la',
    ru: 'Откуда',
  },
  date: {
    ro: 'Data',
    ru: 'Дата',
  },
  time: {
    ro: 'Ora',
    ru: 'Время',
  },
  flightNumber: {
    ro: 'Nr.zbor',
    ru: 'Номер рейса',
  },
  to: {
    ro: 'Spre',
    ru: 'Куда',
  },
  flightTime: {
    ro: 'Timp de zbor',
    ru: 'Время полета',
  },
  personalItem: {
    ro: 'Obiect personal',
    ru: 'Личный предмет',
  },
  includedFree: {
    ro: 'Inclus Gratuit',
    ru: 'Включено бесплатно',
  },
  additionalBaggage: {
    ro: 'Bagaj suplimentar',
    ru: 'Дополнительный багаж',
  },
  transfer: {
    ro: 'Escale:',
    ru: 'Пересадки:',
  },
  takeAndRegisterBaggage: {
    ro: 'Preluarea si înregistrarea bagajului',
    ru: 'Прием и регистрация багажа',
  },
}

const rulesText: any = {
  ro: (
    <>
      <p>
        *Trebuie să vă prezentați la aeroport cu cel puțin trei ore înainte de
        ora îmbarcării, pentru a vă asigura că aveți suficient timp pentru
        efectuarea formalităților de check-in și securitate.
      </p>
      <p>
        *Este important să verificați cu atenție informațiile referitoare la
        zborul Dvs. de pe acest document și să informați agenția Superfly prin
        apel telefonic imediat dacă observați vreo eroare.
      </p>
      <p>
        *Respectați dimensiunile și greutatea bagajului permise de compania
        aeriană și asigurați-vă că vă îndepliniți toate obligațiile referitoare
        la formalitățile de check-in pentru bagaje.
      </p>
      <p>
        *Compania aeriană își rezervă dreptul de a refuza îmbarcarea pasagerilor
        care se comportă agresiv sau care reprezintă o amenințare la adresa
        securității zborului.
      </p>
      <p>
        *Superfly (Superfly Invest S.R.L) și compania aeriană nu își asumă
        responsabilitatea pentru întârzieri la zbor cauzate de pasageri și
        recomandăm tuturor pasagerilor să se prezinte la aeroport cu suficient
        timp înainte de ora de plecare.
      </p>
      <p>
        *Pasagerii sunt responsabili să se informeze de la intreprinderi de stat
        cu privire la documentele necesare pentru a călători în țara de
        destinație, inclusiv pașaportul sau cartea de identitate, viza sau alte
        documente necesare.
      </p>
      <p>
        *Superfly (Superfly Invest S.R.L) nu își asumă responsabilitatea pentru
        pasagerii care nu au documentele necesare pentru a călători în țara de
        destinație.
      </p>
      <p>
        *Superfly (Superfly Invest S.R.L) nu își asumă responsabilitatea pentru
        daunele sau pierderile suferite de pasageri cauzate de pierderea sau
        furtul documentelor, biletelor sau bagajelor și încurajează pasagerii să
        își protejeze cu grijă bunurile personale în timpul călătoriei.
      </p>
      <p>
        *Dacă ați primit bagajul deteriorat trebuie să depuneți imediat o
        reclamație – Property Irregularity Report (P.I.R.) la serviciul
        specializat din cadrul aeroportului ce conține datele Dvs. de
        identificare, ale zborului și ale bagajului înregistrat, precum și
        datele necesare identificării acestuia (tipul geamantanului, culoare,
        dimensiuni, etc.)
      </p>
      <p>
        *Acest document nu este permis de îmbarcare, permisul de îmbarcare se
        eliberează doar la aeroport dupa înregistrarea la zbor.
      </p>
      <p>
        *La prezentarea acestui document emis de Superfly (Superfly Invest
        S.R.L) și confirmarea plății, pasagerii pot benefecia de check-in
        gratuit pentru zbor.
      </p>
      <p>
        *Pentru a benefecia de check-in gratuit pentru zbor pasagerul este
        obligat să apeleze numărul +37360851555 sau +37369639555 cu 24 ore
        înainte de zbor, dar nu mai târziu de 6 ore înaintea zborului, în caz
        contrar pasagerul va achita suplimentar la aeroport serviciul check-in.
      </p>
    </>
  ),
  ru: (
    <>
      <p>
        *Вы должны явиться в аэропорт не позднее чем за три часа до времени
        посадки, чтобы убедиться, что у вас достаточно времени для прохождения
        процедур регистрации и безопасности.
      </p>
      <p>
        *Важно внимательно проверить информацию о вашем рейсе на этом документе
        и немедленно позвонить в агентство Superfly, если вы заметите ошибку.
      </p>
      <p>
        *Соблюдайте допустимые размеры и вес багажа, разрешенные авиакомпанией,
        и убедитесь, что вы выполнили все обязательства по регистрации багажа.
      </p>
      <p>
        *Авиакомпания оставляет за собой право отказать в посадке пассажиров,
        которые ведут себя агрессивно или представляют угрозу для безопасности
        полета.
      </p>
      <p>
        *Superfly (Superfly Invest S.R.L) и авиакомпания не несут
        ответственности за задержки рейсов, вызванные пассажирами, и рекомендуют
        всем пассажирам прибыть в аэропорт заранее.
      </p>
      <p>
        *Пассажиры несут ответственность за информацию от государственных
        предприятий о необходимых документах для поездки в страну назначения,
        включая паспорт или удостоверение личности, визу или другие необходимые
        документы.
      </p>
      <p>
        *Super (Superfly Invest S.R.L) не несет ответственности за пассажиров, у
        которых нет необходимых документов для поездки в страну назначения.
      </p>
      <p>
        *Superfly (Superfly Invest S.R.L) не несет ответственности за ущерб или
        потери, понесенные пассажирами в результате утери или кражи документов,
        билетов или багажа, и рекомендует пассажирам тщательно защищать свои
        личные вещи во время поездки.
      </p>
      <p>
        *Если ваш багаж поврежден, вы должны немедленно подать жалобу – Property
        Irregularity Report (P.I.R.) в специализированный сервис аэропорта,
        который содержит ваши идентификационные данные, данные о рейсе и
        зарегистрированном багаже, а также данные, необходимые для его
        идентификации (тип чемодана, цвет, размеры и т. д.)
      </p>
      <p>
        *Этот документ не является посадочным талоном, посадочный талон выдается
        только в аэропорту после регистрации на рейс. *Предъявив этот документ,
        выданный Superfly (Superfly Invest S.R.L) и подтвердив оплату, пассажиры
        могут воспользоваться бесплатной регистрацией на рейс.
      </p>
      <p>
        *Для бесплатной регистрации на рейс пассажер обязан позвонить по номеру
        +37360851555 или +37369639555 за 24 часа до рейса, но не позднее чем за
        6 часов до рейса, в противном случае пассажир оплатит дополнительно в
        аэропорту услугу регистрации на рейс.
      </p>
    </>
  ),
}
