import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { Chapter } from '@shared/types'
import { chapterNumber } from './library'

// Public reader: never use an admin/service-role key here. The published filter
// is explicit, and Supabase RLS remains the database access boundary.
export const getPublishedChapters = cache(async (): Promise<Chapter[]> => {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { fetch: (url, init) => fetch(url, { ...init, next: { revalidate: 3600 } }) } }
  )
  const { data, error } = await client.from('chapters').select('*').eq('published', true)
  if (error) throw new Error('The library could not be loaded. Please try again.')
  return ((data || []) as Chapter[]).sort((a, b) => chapterNumber(a) - chapterNumber(b))
})
