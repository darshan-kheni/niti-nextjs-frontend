'use client'

import type { Category, Chapter } from '@shared/types'

interface CategoryFilterProps {
  categories: Category[]
  active: Category | null
  onSelect: (category: Category | null) => void
  chapters: Chapter[]
}

export function CategoryFilter({
  categories,
  active,
  onSelect,
  chapters,
}: CategoryFilterProps) {
  const countForCategory = (cat: Category) =>
    chapters.filter((ch) => cat.filter.includes(ch.id)).length

  const base =
    'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans border transition-colors cursor-pointer whitespace-nowrap'
  const activeClass = 'bg-niti-gold/20 text-niti-gold border-niti-gold/30'
  const inactiveClass =
    'bg-[var(--niti-input-bg)] text-niti-text-secondary border-niti-border hover:border-niti-border-hover'

  return (
    <div className="flex items-center gap-2 overflow-x-auto flex-nowrap pb-1 scrollbar-none">
      <button
        className={`${base} ${active === null ? activeClass : inactiveClass}`}
        onClick={() => onSelect(null)}
      >
        All
        <span className="opacity-60">{chapters.length}</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`${base} ${active?.name === cat.name ? activeClass : inactiveClass}`}
          onClick={() =>
            onSelect(active?.name === cat.name ? null : cat)
          }
        >
          <span>{cat.icon}</span>
          {cat.name}
          <span className="opacity-60">{countForCategory(cat)}</span>
        </button>
      ))}
    </div>
  )
}
