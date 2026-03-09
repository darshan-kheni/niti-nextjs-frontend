'use client'

import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'

interface ChapterCardProps {
  chapter: Chapter
  maxPoints: number
  onClick: () => void
  delay: number
}

export function ChapterCard({ chapter, maxPoints, onClick, delay }: ChapterCardProps) {
  const pts = pointCount(chapter.sections)
  const barWidth = maxPoints > 0 ? (pts / maxPoints) * 100 : 0

  return (
    <article
      className="bg-niti-surface rounded-2xl border border-niti-border p-5 cursor-pointer transition-colors hover:bg-niti-surface-hover hover:border-niti-border-hover flex flex-col gap-3 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: chapter.color + '22' }}
        >
          {chapter.icon}
        </div>
        <span className="text-xs font-sans text-niti-gold">{chapter.num}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-serif text-lg font-semibold text-niti-text-primary leading-snug">
          {chapter.title}
        </h3>
        {chapter.subtitle && (
          <p className="text-sm text-niti-text-secondary font-sans mt-1 line-clamp-2">
            {chapter.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <span className="text-xs text-niti-text-muted font-sans">{chapter.date}</span>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${barWidth}%`,
                backgroundColor: chapter.color,
              }}
            />
          </div>
          <span className="text-xs text-niti-text-muted font-sans whitespace-nowrap">
            {pts} pts
          </span>
        </div>
      </div>
    </article>
  )
}
