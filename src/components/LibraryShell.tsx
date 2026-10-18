'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bookmark, Library, Menu, ArrowUpRight, Wallet, BriefcaseBusiness, Sprout, Compass, Sun, FlaskConical, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@shared/constants'
import type { Chapter } from '@shared/types'
import { chapterNumber } from '@/lib/library'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from './ThemeToggle'
import { useReading } from './ReadingProvider'
import { BookMark } from './BrandIcon'

const categoryIcons = [Wallet, BriefcaseBusiness, Sprout, Compass, Sun, FlaskConical]
type ShellChapter = Pick<Chapter, 'id' | 'num'>
type ShellProps = { children: React.ReactNode; chapters?: ShellChapter[]; activeCategory?: string; collection?: string; readerTitle?: string }

function LibraryNavigation({ chapters = [], activeCategory, collection, onNavigate }: Omit<ShellProps, 'children'> & { onNavigate?: () => void }) {
  const { saved, completed } = useReading()
  const savedCount = chapters.filter(chapter => saved.includes(chapter.id)).length
  const completedCount = chapters.filter(chapter => completed.includes(chapter.id)).length
  return <div className="library-navigation">
    <Link href="/" onClick={onNavigate} className="brand" aria-label="Niti home">
      <span className="brand-mark"><BookMark size={23} /></span>
      <span className="brand-name">niti<span className="brand-dot">.</span><small>A wisdom library</small></span>
    </Link>
    <nav className="sidebar-links" aria-label="Library navigation">
      <p className="sidebar-label">Your library</p>
      <Link href="/" onClick={onNavigate} className={cn('sidebar-link', !collection && !activeCategory && 'active')} aria-current={!collection && !activeCategory ? 'page' : undefined}>
        <Library size={18} /><span>All summaries</span><span className="nav-count">{chapters.length}</span>
      </Link>
      <Link href="/?collection=saved" onClick={onNavigate} className={cn('sidebar-link', collection === 'saved' && 'active')} aria-current={collection === 'saved' ? 'page' : undefined}>
        <Bookmark size={18} /><span>Reading list</span><span className="nav-count">{savedCount}</span>
      </Link>
      <Separator className="my-7 bg-white/10" />
      <p className="sidebar-label">Explore by interest</p>
      {CATEGORIES.map((category, index) => {
        const Icon = categoryIcons[index]
        const count = chapters.filter(chapter => category.filter.includes(chapterNumber(chapter))).length
        return <Link key={category.name} href={`/?category=${encodeURIComponent(category.name)}`} onClick={onNavigate} className={cn('sidebar-link category-link', activeCategory === category.name && 'active')} aria-current={activeCategory === category.name ? 'page' : undefined}>
          <Icon size={17} /><span>{category.name}</span><span className="nav-count">{count}</span>
        </Link>
      })}
    </nav>
    <div className="sidebar-bottom">
      <div className="reading-note"><span className="reading-note-icon"><Sprout size={20} strokeWidth={1.5} /></span><p>A few pages.<br />A fresh perspective.</p><span>{completedCount > 0 ? `${completedCount} ${completedCount === 1 ? 'summary' : 'summaries'} read. Keep growing.` : 'Make a little room for a good idea.'}</span></div>
      <div className="sidebar-footer"><span>A personal collection</span><ArrowUpRight size={14} aria-hidden="true" /></div>
    </div>
  </div>
}

export function LibraryShell({ children, chapters = [], activeCategory, collection, readerTitle }: ShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return <TooltipProvider delayDuration={200}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <aside className="desktop-sidebar"><LibraryNavigation chapters={chapters} activeCategory={activeCategory} collection={collection} /></aside>
    <div className="app-main">
      <header className="utility-bar">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild><Button className="mr-2 lg:hidden" variant="ghost" size="icon" aria-label="Open library navigation"><Menu size={20} /></Button></SheetTrigger>
          <SheetContent side="left" className="mobile-sidebar w-[280px] border-0 p-0">
            <SheetTitle className="sr-only">Niti library navigation</SheetTitle><SheetDescription className="sr-only">Browse the library, your reading list, and interests.</SheetDescription>
            <LibraryNavigation chapters={chapters} activeCategory={activeCategory} collection={collection} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Library</Link><ChevronRight size={13} /><span className="truncate">{readerTitle || (collection === 'saved' ? 'Reading list' : activeCategory || 'The collection')}</span></nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <span className="utility-note hidden sm:flex"><span />A little wiser, every day</span>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
    </div>
  </TooltipProvider>
}
