import { BookOpen, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({ saved = false, emptyLibrary = false, onReset }: { saved?: boolean; emptyLibrary?: boolean; onReset?: () => void }) {
  return <div className="empty-state">
    <span className="empty-icon">{saved || emptyLibrary ? <BookOpen size={26} strokeWidth={1.3} /> : <SearchX size={26} strokeWidth={1.3} />}</span>
    <h2>{emptyLibrary ? 'The library is taking shape' : saved ? 'Keep your next read close' : 'No matching ideas just yet'}</h2>
    <p>{emptyLibrary ? 'Published summaries will appear here as they are added.' : saved ? 'Use the bookmark on any summary to add it to your reading list. Your list stays in this browser.' : 'Try another book, author, or topic. You can also clear your filters and explore the whole collection.'}</p>
    {!emptyLibrary && <Button variant="outline" onClick={onReset}>{saved ? 'Explore the collection' : 'Clear search and filters'}</Button>}
  </div>
}
