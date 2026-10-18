import type { CSSProperties } from 'react'
import { Sparkle } from 'lucide-react'
import type { Chapter } from '@shared/types'
import { cn } from '@/lib/utils'
import { chapterNumber, coverPalette } from '@/lib/library'

export function BookCover({ chapter, className }: { chapter: Chapter; className?: string }) {
  const palette = coverPalette(chapter)
  const titleScale = chapter.title.length > 50 ? 0.7 : chapter.title.length > 35 ? 0.8 : chapter.title.length > 25 ? 0.9 : 1
  return (
    <div aria-hidden="true" className={cn('book-cover', `book-pattern-${chapterNumber(chapter) % 3}`, className)} style={{ '--cover-bg': palette.background, '--cover-fg': palette.foreground, '--cover-accent': palette.accent, '--cover-scale': titleScale } as CSSProperties}>
      <div className="book-binding" />
      <div className="book-cover-content">
        <span className="book-imprint">Niti reading notes</span>
        <div className="book-title">{chapter.title}</div>
        <div className="book-symbol"><Sparkle strokeWidth={0.8} /></div>
        <span className="book-author">{chapter.subtitle || 'Collected insights'}</span>
      </div>
    </div>
  )
}
