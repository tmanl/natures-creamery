import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Nature's Creamery — Creamy Without Compromise",
  description: "Premium plant-based spreads crafted with Burcon's innovative protein blends. Clean-label mayonnaise, chipotle mayo, and artisan spreads made in Canada.",
  keywords: "plant-based mayo, vegan mayonnaise, Nature's Creamery, clean label spread, Burcon protein",
  openGraph: {
    title: "Nature's Creamery — Creamy Without Compromise",
    description: "Premium plant-based spreads crafted from nature's best ingredients.",
    type: 'website',
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
