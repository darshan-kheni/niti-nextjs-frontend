import type { Metadata } from 'next'
import { EB_Garamond, Outfit } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const serif = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  applicationName: 'Niti',
  appleWebApp: {
    capable: true,
    title: 'Niti',
    statusBarStyle: 'default',
  },
  title: 'Niti \u2014 Wisdom Codex',
  description:
    'A personal library of book summaries and collected insights. Explore ideas on wealth, mindset, leadership, and a considered life.',
  openGraph: {
    title: 'Niti \u2014 Wisdom Codex',
    description:
      'A personal library of book summaries and collected insights for a considered life.',
    url: 'https://niti.orphilia.com',
    siteName: 'Niti',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
