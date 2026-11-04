import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://www.naturescreamery.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: "Nature's Creamery — Creamy Without Compromise",
  description: "Plant-based mayo, spreads and chocolate protein powder made in Milton, Ontario. Clean label, no eggs, no gums.",
  keywords: "plant-based mayo, vegan mayonnaise, Nature's Creamery, clean label spread, plant protein powder, Milton Ontario",
  openGraph: {
    url: SITE_URL,
    siteName: "Nature's Creamery",
    title: "Nature's Creamery — Creamy Without Compromise",
    description: "Plant-based mayo, spreads and chocolate protein powder made in Milton, Ontario.",
    type: 'website',
    locale: 'en_CA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Lato:wght@300;400;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
