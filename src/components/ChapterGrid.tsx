'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUpRight, BookOpen, Bookmark, Sparkles, Clock } from 'lucide-react'
import type { Chapter } from '@shared/types'
import { CATEGORIES } from '@shared/constants'
import { pointCount } from '@shared/utils'
import { categoryFor, chapterNumber, readingMinutes } from '@/lib/library'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LibraryShell } from './LibraryShell'
import { BookCover } from './BookCover'
import { SearchBar } from './SearchBar'
import { ViewToggle } from './ViewToggle'
import { ChapterCard } from './ChapterCard'
import { ChapterModal } from './ChapterModal'
import { EmptyState } from './EmptyState'
import { useReading } from './ReadingProvider'

export default function ChapterGrid({ chapters, initialCategory, initialCollection }: { chapters: Chapter[]; initialCategory?: string; initialCollection?: string }) {
  const router = useRouter()
  const category = CATEGORIES.find(item => item.name === initialCategory)
  const collection = initialCollection === 'saved' ? 'saved' : 'all'
  const [search, setSearch] = useState('')
  const query = useDeferredValue(search.trim().toLowerCase())
  const [sort, setSort] = useState('collection')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<Chapter | null>(null)
  const { saved, completed, persistent } = useReading()
  const savedChapters = chapters.filter(chapter => saved.includes(chapter.id))
  const totalPoints = chapters.reduce((sum, chapter) => sum + pointCount(chapter.sections), 0)
  const featured = chapters.find(chapter => chapterNumber(chapter) === 3) || chapters[0]
  const shelf = [chapters.find(chapter => chapterNumber(chapter) === 18), featured, chapters.find(chapter => chapterNumber(chapter) === 39)].filter((chapter): chapter is Chapter => Boolean(chapter))
  const filtered = useMemo(() => {
    const result = chapters.filter(chapter => {
      const matchesCategory = !category || categoryFor(chapter)?.name === category.name
      const matchesCollection = collection !== 'saved' || saved.includes(chapter.id)
      const matchesSearch = !query || [chapter.title, chapter.subtitle || '', ...chapter.sections.flatMap(section => [section.heading, ...section.points])].some(text => text.toLowerCase().includes(query))
      return matchesCategory && matchesCollection && matchesSearch
    })
    return result.sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'shortest' ? readingMinutes(a) - readingMinutes(b) || chapterNumber(a) - chapterNumber(b) : chapterNumber(a) - chapterNumber(b))
  }, [chapters, category, collection, saved, query, sort])
  const reset = () => { setSearch(''); router.push('/', { scroll: false }) }
  const changeCollection = (value: string) => {
    const next = new URLSearchParams()
    if (category) next.set('category', category.name)
    if (value === 'saved') next.set('collection', 'saved'); else next.delete('collection')
    router.push(`/${next.size ? `?${next}` : ''}`, { scroll: false })
  }
  const categoryHref = (name?: string) => {
    const next = new URLSearchParams()
    if (collection === 'saved') next.set('collection', 'saved')
    if (name) next.set('category', name)
    return `/${next.size ? `?${next}` : ''}`
  }
  const collectionContent = <>
    <div className="collection-toolbar"><SearchBar value={search} onChange={setSearch} /><div className="sort-and-view"><Select value={sort} onValueChange={setSort}><SelectTrigger className="sort-select" aria-label="Sort summaries"><SelectValue /></SelectTrigger><SelectContent align="end"><SelectItem value="collection">Collection order</SelectItem><SelectItem value="title">Title: A to Z</SelectItem><SelectItem value="shortest">Shortest read</SelectItem></SelectContent></Select><ViewToggle view={view} onChange={setView} /></div></div>
    <nav className="category-pills" aria-label="Filter by interest"><Link href={categoryHref()} scroll={false} className={!category ? 'selected' : ''} aria-current={!category ? 'page' : undefined}>All interests</Link>{CATEGORIES.map(item => <Link key={item.name} href={categoryHref(item.name)} scroll={false} className={category?.name === item.name ? 'selected' : ''} aria-current={category?.name === item.name ? 'page' : undefined}>{item.name}</Link>)}</nav>
    <div className="results-line" role="status" aria-live="polite"><span>{filtered.length} {filtered.length === 1 ? 'summary' : 'summaries'}{query ? ` matching “${search.trim()}”` : category ? ` in ${category.name}` : ' to explore'}</span><span className="hidden sm:inline">{collection === 'saved' ? 'A shelf of your own' : 'Good ideas are worth keeping'}</span></div>
    {!filtered.length ? <EmptyState emptyLibrary={!chapters.length} saved={collection === 'saved' && !savedChapters.length && !query && !category} onReset={reset} /> : <div className={view === 'grid' ? 'summary-grid' : 'summary-list'}>{filtered.map(chapter => <ChapterCard key={chapter.id} chapter={chapter} list={view === 'list'} onPreview={() => setSelected(chapter)} />)}</div>}
  </>
  return <LibraryShell chapters={chapters} activeCategory={category?.name} collection={collection === 'saved' ? collection : undefined}>
    <div className="library-page">
      <section className="library-hero" aria-labelledby="welcome-heading"><div className="hero-copy"><div className="hero-intro"><span className="tiny-rule" />The Niti collection</div><h1 id="welcome-heading">Good books.<br />Lasting perspectives.</h1><p>Ideas worth finding. Lessons worth keeping.<br className="hidden sm:block" /> A personal library for a more considered life.</p><Button asChild className="hero-button"><a href="#collection">Explore the library<ArrowDown size={16} /></a></Button><div className="hero-library-note"><BookOpen size={15} /><span>{chapters.length} summaries</span><span className="small-dot" /><span>{totalPoints.toLocaleString()} collected insights</span></div></div><div className="hero-shelf" aria-label="A selection from the library"><div className="shelf-orbit" />{shelf.map((chapter, index) => <Link href={`/chapter/${chapter.id}`} className={`shelf-book shelf-book-${index}`} key={`${chapter.id}-${index}`} aria-label={`Read ${chapter.title}`}><BookCover chapter={chapter} /></Link>)}<span className="shelf-caption">A small collection. A world of ideas.</span></div></section>
      {featured && <section className="featured-strip" aria-label="A place to begin"><div className="featured-label"><Sparkles size={17} strokeWidth={1.5} /><span>A place to begin</span></div><div className="featured-description"><span className="featured-title">{featured.title}</span><span className="featured-author">{featured.subtitle || 'Collected reading notes'}</span></div><span className="featured-time"><Clock size={14} />{readingMinutes(featured)} min read</span><Button variant="ghost" asChild className="featured-action"><Link href={`/chapter/${featured.id}`}>Open summary<ArrowUpRight size={15} /></Link></Button></section>}
      <section id="collection" className="collection-section" aria-labelledby="collection-heading"><div className="collection-heading"><div><h2 id="collection-heading">{collection === 'saved' ? 'Your reading list' : category ? category.name : 'The library'}</h2><p>{collection === 'saved' ? 'Good ideas, set aside for a quieter moment.' : 'Find the perspective you need, wherever you are in life.'}</p></div><Badge variant="outline" className="collection-count"><BookOpen size={13} />{chapters.length} summaries</Badge></div>
        <Tabs value={collection} onValueChange={changeCollection} className="collection-tabs"><TabsList aria-label="Choose collection"><TabsTrigger value="all"><BookOpen size={15} />All summaries<span>{chapters.length}</span></TabsTrigger><TabsTrigger value="saved"><Bookmark size={14} />Reading list<span>{savedChapters.length}</span></TabsTrigger></TabsList><TabsContent value={collection} className="mt-0">{collectionContent}</TabsContent></Tabs>
        <p className="local-storage-note">{persistent ? 'Your reading list and completed summaries are kept in this browser.' : 'Browser storage is unavailable. Your reading list will last for this session.'}{completed.length > 0 ? ` ${chapters.filter(chapter => completed.includes(chapter.id)).length} summaries read.` : ''}</p>
      </section>
      <footer className="library-footer"><span className="footer-wordmark">niti.</span><p>A little reading goes a long way.</p><span>Collected with intention.</span></footer>
    </div>
    {selected && <ChapterModal chapter={selected} onClose={() => setSelected(null)} />}
  </LibraryShell>
}
