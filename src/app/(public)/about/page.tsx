'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import aboutBanner from '@/assets/img/about-banner.png'
import fourteen from '@/assets/img/fourteen.svg'
import hundred from '@/assets/img/hundred.svg'
import people from '@/assets/img/people.jpg'
import thirteen from '@/assets/img/thirteen.svg'
import { WhyUs } from '@components/why-us'
import { useTranslationsContext } from '@/context/translations-context'

export default function About() {
  const { lang } = useTranslationsContext()
  return (
    <div className="mt-4 pb-20">
      <Header />
      <div className="mb-8 mt-5 flex justify-center lg:mt-20">
        <div className="mx-5 mb-14 flex w-[1000px] flex-col items-center">
          <h3 className="mb-6 text-xl font-medium text-[#323232] lg:text-2xl">
            {info.title[lang]}
          </h3>
          <p className="mb-6 text-center text-sm font-light text-gray-700 lg:text-base">
            {info.mainTextFirst[lang]}
          </p>
          <p className="text-center text-sm font-light text-gray-700 lg:text-base">
            {info.mainTextSecond[lang]}
          </p>
        </div>
      </div>

      <div className="custom-container">
        <Image
          className="custom-light-shadow h-[189px] rounded-[20px] object-cover xl:h-auto"
          src={aboutBanner}
          alt="image"
        />

        <hr className="my-[60px] border-[.5px] border-t-[#E8E8E8]" />

        <section className="mb-[60px]">
          <WhyUs title={info.whyUsTitle[lang]} />
        </section>
        <hr className="  border-t-gray-200" />

        <div className="mt-[60px]">
          <div className="mb-14 flex flex-col items-center">
            <h3 className="mb-2 text-xl font-normal lg:text-2xl">
              {info.ourSuccessTitle[lang]}
            </h3>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-1/3">
              <div className="mb-4 hidden rounded-lg border border-brand-gray bg-white px-6 pb-8 pt-6 lg:block">
                <h3 className="mb-2 text-[22px] font-medium text-[#323232]">
                  {info.leftSectionTitle[lang]}
                </h3>
                <p className="text-justify text-base font-normal text-[#4A4A4A]">
                  {info.leftSectionText[lang]}
                </p>
              </div>
              <Image src={people} alt="image" />
              <Link
                href="/"
                className="custom-light-shadow mt-6 hidden h-11 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white hover:opacity-90 lg:flex"
              >
                <span>{info.buttonLabel[lang]}</span>
              </Link>
            </div>
            <div className="lg:w-2/3">
              <ul className="flex flex-col gap-6 text-sm lg:text-base">
                <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                  <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <Image
                      className="min-w-[89px] max-w-24 lg:max-w-none"
                      width={230}
                      height={95}
                      src={fourteen}
                      alt="icon"
                    />
                    <p className="ml-2 font-normal text-gray-600">
                      {info.firstCardText[lang]}
                    </p>
                  </div>
                </li>
                <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                  <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <Image
                      className="min-w-[89px] max-w-24 lg:max-w-none"
                      width={230}
                      height={73}
                      src={thirteen}
                      alt="icon"
                    />
                    <p className="ml-2 font-normal text-gray-600">
                      {info.secondCardText[lang]}
                    </p>
                  </div>
                </li>
                <li className="rounded-lg border border-brand-gray bg-white p-7 shadow-md shadow-slate-200">
                  <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <Image
                      className="min-w-[89px] max-w-24 lg:max-w-none"
                      width={230}
                      height={69}
                      src={hundred}
                      alt="icon"
                    />
                    <p className="ml-2 font-normal text-gray-600">
                      {info.thirdCardText[lang]}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="mt-6 flex h-11 items-center justify-center rounded-full bg-brand-blue px-8 font-light text-white shadow-md shadow-slate-400 hover:opacity-90 lg:hidden"
            >
              <span>{info.buttonLabel[lang]}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 h-64 w-full"></div>
    </>
  )
}

const info: any = {
  title: {
    ro: 'Despre noi',
    ru: 'О нас',
  },
  mainTextFirst: {
    ro: 'Superfly.md este o agenție de bilete avia care oferă bilete de avion și servicii de călătorie la prețuri avantajoase. Ne străduim să oferim clienților noștri cele mai bune oferte pentru călătorii în destinații din întreaga lume. Superfly.md oferă suport gratuit 24 de ore pe zi, astfel încât clienții pot beneficia de ajutor în orice moment al zilei. În plus, agenția oferă check-in gratuit și ajutor în alegerea zborului corect pentru nevoile fiecărui client. Cu o experiență de ani de zile în industria biletelor avia, echipa noastră este formată din profesioniști cu experiență și pasionați de călătorii.',
    ru: 'Superfly.md - это агентство авиабилетов, предлагающее авиабилеты и туристические услуг по выгодным ценам. Мы стремимся предложить нашим клиентам лучшие предложения для путешествий в различные страны мира. Superfly.md предоставляет бесплатную поддержку 24 часа в сутки, так что клиенты могут получить помощь в любое время суток. Кроме того, агентство предлагает бесплатную регистрацию на рейс и помощь в выборе правильного рейса для каждого клиента. С опытом работы в авиабилетной индустрии на протяжении многих лет, наша команда состоит из опытных профессионалов, которые увлечены путешествиями.',
  },
  mainTextSecond: {
    ro: 'Superfly.md se mândrește cu faptul că oferă cele mai bune soluții și cele mai mici preturi pentru biletele de avion, astfel încât clienții pot călători fără grijă. În plus, agenția oferă și servicii de rezervare de bilete la avion, astfel încât clienții pot fi siguri că locurile lor sunt asigurate pe zborul dorit. Misiunea noastră este de a oferi clienților noștri o experiență de călătorie memorabilă, fără a-i împovăra cu cheltuieli mari. Ne mândrim cu faptul că suntem o agenție de bilete avia de încredere, care pune clienții pe primul loc. De aceea, vă oferim servicii de calitate superioară, începând cu procesul de rezervare și până la întoarcerea acasă. Cu o gamă largă de servicii și un personal dedicat și profesionist, Superfly.md este alegerea ideală pentru cei care doresc să călătorească confortabil și în siguranță. Vă mulțumim pentru că ați ales Superfly.md pentru călătoria dvs. și vă promitem că vom face tot posibilul pentru a vă oferi o experiență de călătorie memorabilă și fără griji.',
    ru: 'Superfly.md гордится тем, что предлагает лучшие решения и самые низкие цены на авиабилеты, так что клиенты могут путешествовать без забот. Кроме того, агентство предлагает услуги по бронированию авиабилетов, так что клиенты могут быть уверены, что их места забронированы на нужном рейсе. Наша миссия - предоставить нашим клиентам незабываемый опыт путешествия, не обременяя их большими расходами. Мы гордимся тем, что мы надежное авиабилетное агентство, которое ставит клиентов на первое место. Поэтому мы предлагаем высококачественные услуги, начиная с процесса бронирования и заканчивая возвращением домой. С широким спектром услуг и преданным и профессиональным персоналом Superfly.md - идеальный выбор для тех, кто хочет путешествовать комфортно и безопасно. Мы благодарим вас за то, что выбрали Superfly.md для своего путешествия, и обещаем сделать все возможное, чтобы предоставить вам незабываемый и беззаботный опыт путешествия.',
  },
  whyUsTitle: {
    ro: '6 Motive să rezervați cu noi!',
    ru: '6 причин бронировать у нас!',
  },
  ourSuccessTitle: {
    ro: 'Succesele noastre',
    ru: 'Наши успехи',
  },
  leftSectionTitle: {
    ro: 'Descoperă Succesele Noastre',
    ru: 'Откройте наши успехи',
  },
  leftSectionText: {
    ro: 'La Superfly, suntem mândri să împărtășim cu tine povestea noastră de succes. De-a lungul anilor, am călătorit alături de mii de clienți înspre destinații exotice, orașe vibrante și aventuri captivante. Cu fiecare călătorie, am adunat experiențe neprețuite și am creat amintiri de neuitat pentru fiecare pasager.',
    ru: 'В Superfly мы гордимся тем, что делимся с вами нашими историями успеха. На протяжении многих лет мы путешествовали вместе с тысячами клиентов в экзотические места, живописные города и захватывающие приключения. С каждой поездкой мы собирали бесценный опыт и создавали незабываемые воспоминания для каждого пассажира.',
  },
  buttonLabel: {
    ro: 'Rezervă acum',
    ru: 'Забронировать сейчас',
  },
  firstCardText: {
    ro: 'Fiecare dintre cei peste 40 de mii de pasageri mulțumiți este pentru noi o poveste de succes. De la călătoriile de afaceri până la vacanțele în familie sau aventurile solo, am avut privilegiul să fim alături de clienții noștri în fiecare etapă a călătoriei lor. Alătură-te și tu comunității noastre de pasageri mulțumiți și descoperă de ce Superfly este alegerea preferată pentru călătoriile tale. Te invităm să explorezi lumea alături de noi și să devii parte din familia Superfly!',
    ru: 'Каждый из более чем 40 тысяч довольных пассажиров для нас - это история успеха. От деловых поездок до семейных отпусков или сольных приключений, мы имели привилегию быть рядом с нашими клиентами на каждом этапе их путешествия. Присоединяйтесь к нашему сообществу довольных пассажиров и узнайте, почему Superfly - предпочтительный выбор для ваших путешествий. Мы приглашаем вас исследовать мир вместе с нами и стать частью семьи Superfly!',
  },
  secondCardText: {
    ro: 'Indiferent dacă călătorești pentru afaceri sau pentru plăcere, căutăm mereu cele mai bune opțiuni de zbor pentru nevoile tale. Cu parteneriate solide cu operatori aerieni de renume, putem oferi tarife competitive, oferte exclusive și servicii personalizate pentru fiecare călătorie. Fie că visezi să explorezi orașele vibrante ale Europei, să te relaxezi pe plajele exotice ale insulelor tropicale sau să te aventuri în locuri îndepărtate și misterioase, colaborarea noastră cu peste 600 de operatori aerieni îți oferă libertatea de a-ți îndeplini fiecare vis de călătorie. Alătură-te nouă și profită de avantajele colaborării noastre extinse cu operatorii aerieni din întreaga lume. Descoperă lumea alături de Superfly și transformă fiecare călătorie într-o experiență de neuitat!',
    ru: 'Независимо от того, путешествуете ли вы по делам или на отдых, мы всегда ищем лучшие варианты перелетов для ваших потребностей. Благодаря прочным партнерским отношениям с известными авиакомпаниями, мы можем предложить конкурентоспособные тарифы, эксклюзивные предложения и персонализированные услуги для каждой поездки. Будь то мечта о посещении живописных городов Европы, отдых на экзотических пляжах тропических островов или приключения в далеких и загадочных местах, наше сотрудничество с более чем 600 авиакомпаниями дает вам свободу осуществить каждую мечту о путешествии. Присоединяйтесь к нам и воспользуйтесь преимуществами нашего широкого сотрудничества с авиакомпаниями со всего мира. Откройте для себя мир вместе с Superfly и превратите каждое путешествие в незабываемый опыт!',
  },
  thirdCardText: {
    ro: 'La Superfly, ne străduim să facem procesul de achiziție a biletelor de avion cât mai ușor și mai convenabil pentru clienții noștri. De aceea, suntem mândri să oferim o gamă variată de opțiuni de plată, astfel încât să poți alege metoda care ți se potrivește cel mai bine. Cu peste 6 tipuri de plăți securizate disponibile, ne asigurăm că fiecare călător are libertatea de a-și achita biletele în modul dorit. Indiferent de metoda de plată aleasă, la Superfly ne angajăm să asigurăm că fiecare tranzacție este sigură, eficientă și transparentă. Alegeți opțiunea care vi se potrivește și bucurați-vă de experiența noastră de rezervare a biletelor de avion fără griji!',
    ru: 'В Superfly мы стремимся сделать процесс покупки авиабилетов максимально простым и удобным для наших клиентов. Поэтому мы гордимся тем, что предлагаем широкий выбор вариантов оплаты, чтобы вы могли выбрать наиболее подходящий для вас способ. С более чем 6 видами безопасных платежей, мы гарантируем, что каждый путешественник имеет свободу оплатить свои билеты так, как ему удобно. Независимо от выбранного способа оплаты, в Superfly мы обязуемся обеспечить, чтобы каждая транзакция была безопасной, эффективной и прозрачной. Выберите подходящий вариант и наслаждайтесь нашим беззаботным опытом бронирования авиабилетов!',
  },
}
