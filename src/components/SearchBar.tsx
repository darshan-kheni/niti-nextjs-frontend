'use client'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-niti-text-muted"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search chapters, topics, authors..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--niti-input-bg)] border border-niti-border text-sm font-sans text-niti-text-primary placeholder:text-niti-text-muted focus:outline-none focus:border-niti-border-hover transition-colors"
      />
    </div>
  )
}
