import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../styles/globals.css'
import React from 'react'

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
