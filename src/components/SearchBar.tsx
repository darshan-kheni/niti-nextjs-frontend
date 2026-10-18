'use client'

import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const focus = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        ref.current?.focus()
      }
    }
    window.addEventListener('keydown', focus)
    return () => window.removeEventListener('keydown', focus)
  }, [])
  return <div className="library-search">
    <Search className="search-icon" size={18} aria-hidden="true" />
    <Input ref={ref} type="search" aria-label="Search summaries, authors, and ideas" placeholder="Search books, authors, or an idea…" value={value} onChange={event => onChange(event.target.value)} className="h-12 rounded-xl pl-11 pr-12 shadow-none" />
    {value ? <Button size="icon" variant="ghost" className="search-clear size-8" onClick={() => { onChange(''); ref.current?.focus() }} aria-label="Clear search"><X size={15} /></Button> : <kbd aria-hidden="true" className="search-shortcut">⌘ K</kbd>}
  </div>
}
