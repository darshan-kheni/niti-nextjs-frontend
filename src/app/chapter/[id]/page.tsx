import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChapterDetail } from '@/components/ChapterDetail'
import { getPublishedChapters } from '@/lib/chapters'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const chapters = await getPublishedChapters()
  return chapters.map(chapter => ({ id: String(chapter.id) }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const chapters = await getPublishedChapters()
  const chapter = chapters.find(chapter => String(chapter.id) === params.id)
  if (!chapter) notFound()
  return {
    title: `${chapter.title} | Niti`,
    description: `Explore the collected insights from ${chapter.title}${chapter.subtitle ? ` — ${chapter.subtitle}` : ''}.`,
    openGraph: { title: `${chapter.title} | Niti`, description: `Collected reading notes and key ideas from ${chapter.title}.` },
  }
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const chapters = await getPublishedChapters()
  const index = chapters.findIndex(chapter => String(chapter.id) === params.id)
  if (index === -1) notFound()
  const neighbors = (chapter: typeof chapters[number] | undefined) => chapter ? { id: chapter.id, title: chapter.title } : undefined
  return <ChapterDetail chapter={chapters[index]} library={chapters.map(({ id, num }) => ({ id, num }))} previous={neighbors(chapters[index - 1])} next={neighbors(chapters[index + 1])} />
}
