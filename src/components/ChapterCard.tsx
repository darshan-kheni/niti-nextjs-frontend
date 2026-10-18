'use client'

import Link from 'next/link'
import { ArrowUpRight, Bookmark, Check, Clock, Eye } from 'lucide-react'
import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'
import { categoryFor, excerpt, readingMinutes } from '@/lib/library'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { BookCover } from './BookCover'
import { useReading } from './ReadingProvider'

export function ChapterCard({ chapter, onPreview, list = false }: { chapter: Chapter; onPreview: () => void; list?: boolean }) {
  const { saved, completed, ready, toggleSaved } = useReading()
  const isSaved = saved.includes(chapter.id)
  const isRead = completed.includes(chapter.id)
  return <Card className={`summary-card ${list ? 'summary-list-row' : ''}`}>
    <div className="cover-stage">
      <Link href={`/chapter/${chapter.id}`} className="cover-link" aria-label={`Read ${chapter.title}`}><BookCover chapter={chapter} /></Link>
      <Tooltip>
        <TooltipTrigger asChild><Button disabled={!ready} variant="secondary" size="icon" className="save-button" onClick={() => toggleSaved(chapter.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${chapter.title}${isSaved ? ' from reading list' : ' to reading list'}`} aria-pressed={isSaved}><Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} /></Button></TooltipTrigger>
        <TooltipContent>{isSaved ? 'Remove from reading list' : 'Save for later'}</TooltipContent>
      </Tooltip>
      {isRead && <Badge className="read-badge"><Check size={12} />Read</Badge>}
    </div>
    <CardContent className="summary-card-content">
      <div className="summary-category">{categoryFor(chapter)?.name || 'Collected wisdom'}<span>{chapter.num}</span></div>
      <Link href={`/chapter/${chapter.id}`} className="summary-title-link"><h3>{chapter.title}</h3></Link>
      <p className="summary-author">{chapter.subtitle || 'Collected reading notes'}</p>
      {list && <p className="list-excerpt">{excerpt(chapter)}</p>}
      <div className="summary-meta"><span><Clock size={13} />{readingMinutes(chapter)} min read</span><span>{pointCount(chapter.sections)} key {pointCount(chapter.sections) === 1 ? 'point' : 'points'}</span></div>
      <div className="card-actions"><Button variant="ghost" size="sm" className="preview-button" onClick={onPreview}><Eye size={14} />Quick look</Button><Link href={`/chapter/${chapter.id}`} className="read-link" aria-label={`Read summary: ${chapter.title}`}>Read summary<ArrowUpRight size={14} /></Link></div>
    </CardContent>
  </Card>
}
