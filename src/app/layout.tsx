import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'
import React from 'react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'superfly',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {/*todo: extract */}
        <main className="container mx-auto px-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
