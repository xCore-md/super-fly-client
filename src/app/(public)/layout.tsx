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
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
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
