'use client'
import { LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ViewToggle({ view, onChange }: { view: 'grid' | 'list'; onChange: (view: 'grid' | 'list') => void }) {
  return <div className="view-toggle" role="group" aria-label="Collection layout">
    <Button size="icon" variant="ghost" aria-label="Grid view" aria-pressed={view === 'grid'} data-active={view === 'grid'} onClick={() => onChange('grid')}><LayoutGrid size={16} /></Button>
    <Button size="icon" variant="ghost" aria-label="List view" aria-pressed={view === 'list'} data-active={view === 'list'} onClick={() => onChange('list')}><List size={18} /></Button>
  </div>
}
