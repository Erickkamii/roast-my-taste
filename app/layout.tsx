import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { TokenCapture } from '@/components/token-capture'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Roast My Taste',
  description: 'Analise seu gosto musical do Spotify e receba um roast personalizado',
  generator: 'v0.app',
  icons: {
    icon: '/roaster_icon.png',
    apple: '/roaster_icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <TokenCapture />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}