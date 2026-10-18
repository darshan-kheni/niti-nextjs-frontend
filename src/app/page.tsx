import ChapterGrid from '@/components/ChapterGrid'
import { getPublishedChapters } from '@/lib/chapters'

export const revalidate = 3600

export default async function HomePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const chapters = await getPublishedChapters()
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const collection = typeof searchParams.collection === 'string' ? searchParams.collection : undefined
  return <ChapterGrid chapters={chapters} initialCategory={category} initialCollection={collection} />
}
