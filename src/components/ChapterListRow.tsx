'use client'

import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'

interface ChapterListRowProps {
  chapter: Chapter
  maxPoints: number
  onClick: () => void
}

export function ChapterListRow({ chapter, maxPoints, onClick }: ChapterListRowProps) {
  const pts = pointCount(chapter.sections)
  const barWidth = maxPoints > 0 ? (pts / maxPoints) * 100 : 0

  return (
    <div
      className="flex items-center gap-4 hover:bg-niti-surface-hover rounded-xl px-4 py-3 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
        style={{ backgroundColor: chapter.color + '22' }}
      >
        {chapter.icon}
      </div>

      <span className="text-xs font-sans text-niti-gold w-8 flex-shrink-0">
        {chapter.num}
      </span>

      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-base font-semibold text-niti-text-primary truncate">
          {chapter.title}
        </h3>
        {chapter.subtitle && (
          <p className="text-xs text-niti-text-secondary font-sans truncate">
            {chapter.subtitle}
          </p>
        )}
      </div>

      <span className="text-xs text-niti-text-muted font-sans flex-shrink-0 hidden sm:block">
        {chapter.date}
      </span>

      <div className="w-24 flex items-center gap-2 flex-shrink-0 hidden md:flex">
        <div className="flex-1 h-[3px] rounded-full bg-[var(--niti-bar-bg)]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${barWidth}%`,
              backgroundColor: chapter.color,
            }}
          />
        </div>
        <span className="text-xs text-niti-text-muted font-sans whitespace-nowrap">
          {pts}
        </span>
      </div>
    </div>
  )
}
