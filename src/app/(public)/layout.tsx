import Head from 'next/head'
import React, { Suspense } from 'react'
import { Footer } from '@components/footer'
import { Header } from '@components/header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-527RZQ0K6E"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-527RZQ0K6E');
            `,
          }}
        ></script>
      </Head>
      <Header menu={menu} />
      <Suspense fallback={<div className="h-svh w-full bg-brand-blue"></div>}>
        {children}
      </Suspense>
      <Footer />
    </div>
  )
}

const menu = {
  ro: [
    {
      title: 'Acasa',
      href: '/',
    },
    {
      title: 'Despre noi',
      href: '/about',
    },
    {
      title: 'Informatii utile',
      href: '/blog',
    },
    {
      title: 'Contacte',
      href: '/contacts',
    },
    {
      title: 'Gestionare rezervari',
      href: '/manage-reservations',
    },
  ],
  ru: [
    {
      title: 'Главная',
      href: '/',
    },
    {
      title: 'О нас',
      href: '/about',
    },
    {
      title: 'Полезная информация',
      href: '/blog',
    },
    {
      title: 'Контакты',
      href: '/contacts',
    },
    {
      title: 'Управление бронированием',
      href: '/manage-reservations',
    },
  ],
}
