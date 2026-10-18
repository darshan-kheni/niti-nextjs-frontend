'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCheck, Clock, CalendarDays, List, Minus, Plus, Sparkles } from 'lucide-react'
import type { Chapter } from '@shared/types'
import { pointCount } from '@shared/utils'
import { categoryFor, readingMinutes } from '@/lib/library'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LibraryShell } from './LibraryShell'
import { useReading } from './ReadingProvider'

type Neighbor = { id: number; title: string }
export function ChapterDetail({ chapter, library, previous, next }: { chapter: Chapter; library: Pick<Chapter, 'id' | 'num'>[]; previous?: Neighbor; next?: Neighbor }) {
  const { saved, completed, ready, toggleSaved, toggleCompleted } = useReading()
  const [fontSize, setFontSize] = useState(22)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const sectionContainer = useRef<HTMLDivElement>(null)
  const isSaved = saved.includes(chapter.id)
  const isCompleted = completed.includes(chapter.id)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const container = sectionContainer.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const distance = Math.max(1, rect.height - window.innerHeight + 120)
      setProgress(Math.min(100, Math.max(0, Math.round((120 - rect.top) / distance * 100))))
      const sections = container.querySelectorAll<HTMLElement>('[data-reading-section]')
      let current = 0
      sections.forEach((section, index) => { if (section.getBoundingClientRect().top < window.innerHeight * .4) current = index })
      setActiveSection(current)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [chapter.id, fontSize])
  const outline = <nav aria-label="Summary contents">{chapter.sections.map((section, index) => <a key={index} href={`#section-${index}`} aria-current={activeSection === index ? 'true' : undefined}>{section.heading}</a>)}</nav>
  return <LibraryShell chapters={library} readerTitle={chapter.title}>
    <div className="reader-page">
      <Link href="/#collection" className="reader-back"><ArrowLeft size={14} />Back to the library</Link>
      <div className="reader-layout">
        <aside className="reader-outline"><p>In this summary</p>{outline}<div className="reader-progress"><div><span>Your reading progress</span><span>{progress}%</span></div><Progress value={progress} aria-label="Summary reading progress" /></div></aside>
        <article className="reader-article">
          <header className="reader-heading"><div className="reader-kicker"><Badge variant="secondary" className="badge">{categoryFor(chapter)?.name || 'Collected wisdom'}</Badge><span>Summary {chapter.num}</span></div><h1>{chapter.title}</h1><p className="reader-subtitle">{chapter.subtitle || 'Collected reading notes'}</p><div className="reader-metadata"><span><Clock size={13} />{readingMinutes(chapter)} min read</span><span><List size={13} />{pointCount(chapter.sections)} key points</span><span><CalendarDays size={13} />Notes from {chapter.date}</span></div></header>
          <div className="reader-controls"><div><Button disabled={!ready} variant="ghost" onClick={() => toggleSaved(chapter.id)} aria-pressed={isSaved}><Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />{isSaved ? 'Saved to reading list' : 'Save for later'}</Button></div><div className="reader-font-controls"><span>Text size</span><Button variant="ghost" size="icon" aria-label="Decrease reading text size" disabled={fontSize <= 20} onClick={() => setFontSize(value => Math.max(20, value - 2))}><Minus size={16} /></Button><Button variant="ghost" size="icon" aria-label="Increase reading text size" disabled={fontSize >= 30} onClick={() => setFontSize(value => Math.min(30, value + 2))}><Plus size={16} /></Button></div></div>
          <details className="reader-mobile-outline"><summary>In this summary · {chapter.sections.length} {chapter.sections.length === 1 ? 'section' : 'sections'}</summary>{outline}</details>
          <div ref={sectionContainer} className="reader-sections" style={{ '--reading-size': `${fontSize / 16}rem` } as CSSProperties}>{chapter.sections.map((section, index) => <section id={`section-${index}`} data-reading-section key={index} className="reader-section"><h2>{section.heading}</h2><ul>{section.points.map((point, pointIndex) => {
            const isQuote = /^[“"‘]/.test(point.trim())
            return <li key={pointIndex} className={isQuote ? 'quote-point' : undefined}>{isQuote ? <blockquote>{point}</blockquote> : point}</li>
          })}</ul></section>)}</div>
          <section className="reader-end"><Sparkles size={24} strokeWidth={1.2} /><h2>A good idea is just the beginning.</h2><p>Take one insight with you. Give it a little space in your day, and see what changes.</p><Button variant={isCompleted ? 'secondary' : 'default'} disabled={!ready} onClick={() => toggleCompleted(chapter.id)} aria-pressed={isCompleted}>{isCompleted ? <CheckCheck size={16} /> : <Check size={16} />}{isCompleted ? 'Completed · mark as unread' : 'Mark as read'}</Button></section>
          <nav className="reader-neighbors" aria-label="More summaries"><div>{previous && <Link href={`/chapter/${previous.id}`}><small><ArrowLeft size={12} />Previous summary</small><span>{previous.title}</span></Link>}</div><div>{next ? <Link href={`/chapter/${next.id}`}><small>Next summary<ArrowRight size={12} /></small><span>{next.title}</span></Link> : <Link href="/#collection"><small>Keep exploring<ArrowRight size={12} /></small><span>Return to the library</span></Link>}</div></nav>
        </article>
      </div>
      <footer className="library-footer"><span className="footer-wordmark">niti.</span><p>Read slowly. Live thoughtfully.</p><span>Your place in the world of ideas.</span></footer>
    </div>
  </LibraryShell>
}
