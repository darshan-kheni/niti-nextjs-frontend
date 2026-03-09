'use client'

import { useState, useMemo } from 'react'
import type { Chapter, Category } from '@shared/types'
import { CATEGORIES } from '@shared/constants'
import { pointCount } from '@shared/utils'
import { Header } from './Header'
import { SearchBar } from './SearchBar'
import { CategoryFilter } from './CategoryFilter'
import { ViewToggle } from './ViewToggle'
import { ChapterCard } from './ChapterCard'
import { ChapterListRow } from './ChapterListRow'
import { ChapterModal } from './ChapterModal'
import { EmptyState } from './EmptyState'

export default function ChapterGrid({ chapters }: { chapters: Chapter[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<Chapter | null>(null)

  const filtered = useMemo(() => {
    return chapters.filter((ch) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        ch.title.toLowerCase().includes(q) ||
        (ch.subtitle || '').toLowerCase().includes(q) ||
        ch.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.points.some((p) => p.toLowerCase().includes(q))
        )
      const matchCat = !activeCategory || activeCategory.filter.includes(ch.id)
      return matchSearch && matchCat
    })
  }, [chapters, search, activeCategory])

  const totalPoints = useMemo(
    () => chapters.reduce((sum, ch) => sum + pointCount(ch.sections), 0),
    [chapters]
  )

  const maxPoints = useMemo(
    () => Math.max(...chapters.map((ch) => pointCount(ch.sections))),
    [chapters]
  )

  return (
    <div className="min-h-screen">
      <Header chapterCount={chapters.length} pointCount={totalPoints} />

      <div className="px-4 md:px-10 py-4 border-b border-niti-border space-y-3">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CategoryFilter
            categories={CATEGORIES}
            active={activeCategory}
            onSelect={setActiveCategory}
            chapters={chapters}
          />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      <div className="px-4 md:px-10 py-3">
        <p className="text-niti-text-muted font-sans text-xs tracking-wider uppercase">
          {filtered.length === chapters.length
            ? `Showing all ${chapters.length} chapters`
            : `${filtered.length} of ${chapters.length} chapters`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : view === 'grid' ? (
        <div className="px-4 md:px-10 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((ch, i) => (
            <ChapterCard
              key={ch.id}
              chapter={ch}
              maxPoints={maxPoints}
              onClick={() => setSelected(ch)}
              delay={i * 30}
            />
          ))}
        </div>
      ) : (
        <div className="px-4 md:px-10 pb-10 flex flex-col gap-1">
          {filtered.map((ch) => (
            <ChapterListRow
              key={ch.id}
              chapter={ch}
              maxPoints={maxPoints}
              onClick={() => setSelected(ch)}
            />
          ))}
        </div>
      )}

      {selected && (
        <ChapterModal chapter={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
