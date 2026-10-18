'use client'

import { ThemeProvider } from 'next-themes'
import { ReadingProvider } from './ReadingProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReadingProvider>{children}</ReadingProvider>
    </ThemeProvider>
  )
}
