import { cookies } from 'next/headers'
import { createServerClient } from '@shared/supabase/server'
import type { Chapter } from '@shared/types'
import ChapterGrid from '@/components/ChapterGrid'

export const revalidate = 3600

export default async function HomePage() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: chapters, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('published', true)
    .order('num', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch chapters: ${error.message}`)
  }

  return (
    <main className="min-h-screen">
      <ChapterGrid chapters={(chapters as Chapter[]) ?? []} />
    </main>
  )
}
