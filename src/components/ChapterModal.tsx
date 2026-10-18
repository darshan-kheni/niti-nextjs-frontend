'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Bookmark, Clock, BookOpen } from 'lucide-react'
import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'
import { categoryFor, readingMinutes } from '@/lib/library'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BookCover } from './BookCover'
import { useReading } from './ReadingProvider'

export function ChapterModal({ chapter, onClose }: { chapter: Chapter; onClose: () => void }) {
  const { saved, ready, toggleSaved } = useReading()
  const returnFocus = useRef(typeof document !== 'undefined' ? document.activeElement as HTMLElement : null)
  const isSaved = saved.includes(chapter.id)
  return <Dialog open onOpenChange={open => { if (!open) onClose() }}>
    <DialogContent className="preview-dialog" onCloseAutoFocus={event => { event.preventDefault(); returnFocus.current?.focus() }}>
      <div className="preview-book"><BookCover chapter={chapter} /></div>
      <div className="preview-body">
        <Badge variant="secondary" className="mb-4">{categoryFor(chapter)?.name || 'Collected wisdom'}</Badge>
        <DialogTitle className="font-serif text-3xl font-medium leading-tight">{chapter.title}</DialogTitle>
        <DialogDescription className="mt-2 text-base">{chapter.subtitle || 'Collected reading notes'}</DialogDescription>
        <div className="preview-meta"><span><Clock size={14} />{readingMinutes(chapter)} min read</span><span><BookOpen size={14} />{pointCount(chapter.sections)} key points</span></div>
        <Separator className="my-5" />
        <h3 className="mb-3 text-base font-medium">Inside this summary</h3>
        <ul className="preview-outline">{chapter.sections.slice(0, 5).map((section, index) => <li key={index}><span />{section.heading}</li>)}</ul>
        {chapter.sections.length > 5 && <p className="mt-3 text-sm text-muted-foreground">And {chapter.sections.length - 5} more sections to explore.</p>}
        <div className="preview-actions"><Button asChild><Link href={`/chapter/${chapter.id}`}>Read the summary<ArrowUpRight size={16} /></Link></Button><Button variant="outline" size="icon" disabled={!ready} aria-label={isSaved ? 'Remove from reading list' : 'Save to reading list'} aria-pressed={isSaved} onClick={() => toggleSaved(chapter.id)}><Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} /></Button></div>
      </div>
    </DialogContent>
  </Dialog>
}
