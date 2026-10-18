'use client'
import { BookOpen, RotateCcw } from 'lucide-react'
import { LibraryShell } from '@/components/LibraryShell'
import { Button } from '@/components/ui/button'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <LibraryShell><div className="page-state"><BookOpen size={36} strokeWidth={1.2} /><h2>The library needs a moment.</h2><p>We couldn’t load the summaries. Check your connection, then try opening the library again.</p><Button onClick={reset}><RotateCcw size={15} />Try again</Button></div></LibraryShell>
}
