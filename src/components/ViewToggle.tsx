'use client'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  const base =
    'p-2 rounded-lg text-sm transition-colors cursor-pointer'

  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      <button
        className={`${base} ${view === 'grid' ? 'text-niti-gold' : 'text-niti-text-muted hover:text-niti-text-secondary'}`}
        onClick={() => onChange('grid')}
        aria-label="Grid view"
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
      </button>
      <button
        className={`${base} ${view === 'list' ? 'text-niti-gold' : 'text-niti-text-muted hover:text-niti-text-secondary'}`}
        onClick={() => onChange('list')}
        aria-label="List view"
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <rect x="1" y="1" width="14" height="3" rx="1" />
          <rect x="1" y="6.5" width="14" height="3" rx="1" />
          <rect x="1" y="12" width="14" height="3" rx="1" />
        </svg>
      </button>
    </div>
  )
}
