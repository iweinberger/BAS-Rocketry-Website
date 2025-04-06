'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import MouseflowScript from './components/MouseflowScript'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BAS Rocketry',
  description: 'Building the future of space exploration, one rocket at a time!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="future-engineer" content="I see you're a future engineer too! Email us at rocketry@bastoronto.org to talk or work with us!" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <MouseflowScript />
        {children}
        <Analytics />
      </body>
    </html>
  )
} 