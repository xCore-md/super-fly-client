import Head from 'next/head'
import React from 'react'
import { Footer } from '@components/footer'
import { Header } from '@components/header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      {children}
      <Footer />
    </>
  )
}

const menu = [
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
]
