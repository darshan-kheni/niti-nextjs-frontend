'use client'

import { useEffect } from 'react'
import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'

interface ChapterModalProps {
  chapter: Chapter
  onClose: () => void
}

export function ChapterModal({ chapter, onClose }: ChapterModalProps) {
  const pts = pointCount(chapter.sections)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-full max-h-full md:h-auto md:max-h-[90vh] overflow-y-auto bg-niti-surface rounded-none md:rounded-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent line */}
        <div className="h-1 rounded-t-2xl bg-gradient-to-r from-niti-gold to-amber-800" />

        {/* Close button */}
        <button
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-lg text-niti-text-muted hover:text-niti-text-primary hover:bg-white/[0.05] transition-colors z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="text-lg">&times;</span>
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
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
              <h2 className="font-serif text-[28px] font-semibold text-niti-text-primary leading-tight">
                {chapter.title}
              </h2>
              {chapter.subtitle && (
                <p className="text-sm text-niti-text-secondary font-sans mt-2">
                  {chapter.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {chapter.sections.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-[3px] h-4 rounded-full"
                    style={{ backgroundColor: chapter.color }}
                  />
                  <h3 className="uppercase font-sans text-xs tracking-widest text-niti-text-secondary font-medium">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-2 pl-4">
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
          <div className="text-center text-niti-text-muted mt-8 tracking-[0.5em] text-sm">
            &#9670; &#9670; &#9670;
          </div>
        </div>
      </div>
    </div>
  )
}
