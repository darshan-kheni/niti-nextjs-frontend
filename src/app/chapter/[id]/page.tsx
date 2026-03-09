import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@shared/supabase/server'
import { ChapterDetail } from '@/components/ChapterDetail'
import type { Chapter } from '@shared/types'
import type { Metadata } from 'next'

export const revalidate = 3600
export const dynamicParams = true

// Use direct client for build-time functions (no request context available)
function createBuildClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function generateStaticParams() {
  const supabase = createBuildClient()
  const { data } = await supabase
    .from('chapters')
    .select('id')
    .eq('published', true)
  return data?.map(c => ({ id: String(c.id) })) ?? []
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createServerClient(cookies())
  const { data: chapter } = await supabase
    .from('chapters')
    .select('title, subtitle')
    .eq('id', params.id)
    .eq('published', true)
    .single()

  if (!chapter) return { title: 'Chapter Not Found' }

  const title = chapter.subtitle
    ? `${chapter.title} — ${chapter.subtitle}`
    : chapter.title

  return {
    title: `${title} | Niti`,
    description: `Key insights from ${chapter.title}`,
    openGraph: { title, description: `Key insights from ${chapter.title}` },
  }
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient(cookies())
  const { data: chapter } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', params.id)
    .eq('published', true)
    .single()
  if (!chapter) notFound()
  return <ChapterDetail chapter={chapter as Chapter} />
}
