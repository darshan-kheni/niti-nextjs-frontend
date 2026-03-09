'use client'

import Link from 'next/link'
import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'

interface ChapterDetailProps {
  chapter: Chapter
}

export function ChapterDetail({ chapter }: ChapterDetailProps) {
  const pts = pointCount(chapter.sections)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-sans text-niti-text-secondary hover:text-niti-gold transition-colors mb-8"
      >
        <span>&larr;</span>
        Back to Library
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: chapter.color + '22' }}
        >
          {chapter.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-xs font-sans text-niti-text-muted mb-2">
            <span className="text-niti-gold font-medium">{chapter.num}</span>
            <span>{chapter.date}</span>
            <span>{pts} points</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-niti-text-primary leading-tight">
            {chapter.title}
          </h1>
          {chapter.subtitle && (
            <p className="text-base text-niti-text-secondary font-sans mt-3">
              {chapter.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {chapter.sections.map((section, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-[3px] h-4 rounded-full"
                style={{ backgroundColor: chapter.color }}
              />
              <h2 className="uppercase font-sans text-xs tracking-widest text-niti-text-secondary font-medium">
                {section.heading}
              </h2>
            </div>
            <ul className="space-y-3 pl-4">
              {section.points.map((point, pIdx) => {
                const isQuote = point.startsWith('\u201C') || point.startsWith('"')
                if (isQuote) {
                  return (
                    <li
                      key={pIdx}
                      className="text-sm text-niti-text-secondary font-serif italic border-l-2 border-niti-border-hover pl-3 py-0.5"
                    >
                      {point}
                    </li>
                  )
                }
                return (
                  <li
                    key={pIdx}
                    className="text-sm text-niti-text-primary flex items-start gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: chapter.color }}
                    />
                    <span>{point}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* End ornament */}
      <div className="text-center text-niti-text-muted mt-12 tracking-[0.5em] text-sm">
        &#9670; &#9670; &#9670;
      </div>
    </div>
  )
}
