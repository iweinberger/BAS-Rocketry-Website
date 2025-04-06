'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

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
  useEffect(() => {
    window._mfq = window._mfq || [];
    
    (function() {
      var mf = document.createElement("script");
      mf.type = "text/javascript";
      mf.defer = true;
      mf.src = "//cdn.mouseflow.com/projects/ee5128fc-9845-4a1e-8f16-3960fa1e22dd.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="future-engineer" content="I see you're a future engineer too! Email us at rocketry@bastoronto.org to talk or work with us!" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
} 