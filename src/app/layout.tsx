import type { Metadata } from 'next'
import { EB_Garamond, Outfit } from 'next/font/google'
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
  title: 'Niti \u2014 Wisdom Codex',
  description:
    'Explore 49+ book summaries distilled into actionable wisdom. A curated codex of insights from the greatest minds.',
  openGraph: {
    title: 'Niti \u2014 Wisdom Codex',
    description:
      'Explore 49+ book summaries distilled into actionable wisdom. A curated codex of insights from the greatest minds.',
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-niti-bg text-niti-text-primary font-serif min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
