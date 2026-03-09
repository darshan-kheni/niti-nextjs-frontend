'use client'

import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  chapterCount: number
  pointCount: number
}

export function Header({ chapterCount, pointCount }: HeaderProps) {
  return (
    <header className="px-4 md:px-10 py-8 border-b border-niti-border">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[image:linear-gradient(135deg,var(--niti-gold-gradient-from),var(--niti-gold-gradient-to))] flex items-center justify-center flex-shrink-0">
          <span className="text-niti-bg text-xl font-serif font-bold">N</span>
        </div>
        <div>
          <h1 className="text-2xl font-serif font-semibold text-niti-gold">
            Niti
          </h1>
          <p className="text-sm font-sans text-niti-text-secondary">
            Wisdom Codex
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <p className="hidden sm:block text-xs font-sans text-niti-text-muted tracking-wider uppercase">
            {chapterCount} chapters &middot; {pointCount} key points
          </p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
