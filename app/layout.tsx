import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import MouseflowScript from './components/MouseflowScript'
import NavBar from './components/NavBar'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BAS Rocketry',
  description: 'Welcome to BAS Rocketry - Don\'t over think it, we already did.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <MouseflowScript />
        {children}
        <Analytics />
      </body>
    </html>
  )
} 