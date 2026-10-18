import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { LibraryShell } from '@/components/LibraryShell'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return <LibraryShell><div className="page-state"><BookOpen size={36} strokeWidth={1.2} /><h1>This page is off the shelf.</h1><p>The summary may have moved or is no longer published. There are more ideas waiting in the library.</p><Button asChild><Link href="/"><ArrowLeft size={15} />Back to the library</Link></Button></div></LibraryShell>
}
