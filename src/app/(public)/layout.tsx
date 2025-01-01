import Head from 'next/head'
import Script from 'next/script'
import React, { Suspense } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
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
      </Head>
      <Header menu={menu} />
      <Suspense fallback={<div className="h-svh w-full bg-brand-blue"></div>}>
        {children}
      </Suspense>
      <Script id="clarity-script" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "pkhvjppy9s");
          `}
      </Script>
      <GoogleAnalytics gaId="G-527RZQ0K6E" />
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
