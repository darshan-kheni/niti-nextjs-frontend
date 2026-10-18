import { Skeleton } from '@/components/ui/skeleton'
import { LibraryShell } from './LibraryShell'

export function LibrarySkeleton({ reader = false }: { reader?: boolean }) {
  return <LibraryShell><div className="skeleton-page" role="status" aria-label={reader ? 'Loading summary' : 'Loading library'}>
    <span className="sr-only">{reader ? 'Opening your summary…' : 'Opening the library…'}</span>
    <Skeleton className="mb-5 h-4 w-32" /><Skeleton className="mb-3 h-14 max-w-md" /><Skeleton className="mb-8 h-14 w-2/3 max-w-sm" />
    {reader ? <div className="mt-12 space-y-6">{Array.from({ length: 8 }, (_, index) => <Skeleton className="h-5 w-full" key={index} />)}</div> : <><Skeleton className="mb-12 h-10 w-40" /><Skeleton className="mb-8 h-12 w-full" /><div className="summary-grid">{Array.from({ length: 6 }, (_, index) => <div key={index} className="space-y-4"><Skeleton className="h-52 w-full" /><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-1/2" /></div>)}</div></>}
  </div></LibraryShell>
}
