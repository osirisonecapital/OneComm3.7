import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'One Community | Discover Your Energy Type & Name Vibration',
  description: 'Join thousands discovering their true energetic potential through ancient wisdom and modern science.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
} 