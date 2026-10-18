import { createClient } from '@supabase/supabase-js'
import { chapterSchema } from '../shared/schemas'
import { CATEGORIES } from '../shared/constants'
import type { Chapter } from '../shared/types'

async function audit() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Set the public Supabase reader credentials before running this read-only audit.')
  const client = createClient(url, key)
  const { data, error } = await client.from('chapters').select('*')
  if (error) throw new Error('Unable to read chapters with the configured reader credentials.')
  const chapters = (data || []) as Chapter[]
  const duplicates = (values: unknown[]) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))]
  const malformed = chapters.flatMap(chapter => {
    const result = chapterSchema.safeParse(chapter)
    return result.success ? [] : [{ id: chapter.id, issues: result.error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })) }]
  })
  const report = {
    checkedAt: new Date().toISOString(),
    scope: 'Read-only: rows visible to the configured public reader key. No writes performed. Database constraints and RLS policies require SQL/management access to verify.',
    rows: chapters.length,
    published: chapters.filter(chapter => chapter.published).length,
    sections: chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0),
    points: chapters.reduce((sum, chapter) => sum + chapter.sections.reduce((count, section) => count + section.points.length, 0), 0),
    columns: Object.keys(chapters[0] || {}),
    invalidRows: malformed,
    duplicateIds: duplicates(chapters.map(chapter => chapter.id)),
    duplicateNumbers: duplicates(chapters.map(chapter => chapter.num)),
    duplicateTitles: duplicates(chapters.map(chapter => chapter.title)),
    missingSubtitleIds: chapters.filter(chapter => !chapter.subtitle?.trim()).map(chapter => chapter.id),
    unmappedCategoryIds: chapters.filter(chapter => !CATEGORIES.some(category => category.filter.includes(Number(chapter.num.replace(/\D/g, ''))))).map(chapter => chapter.id),
    categories: CATEGORIES.map(category => ({ name: category.name, count: chapters.filter(chapter => category.filter.includes(Number(chapter.num.replace(/\D/g, '')))).length })),
  }
  console.log(JSON.stringify(report, null, 2))
  if (malformed.length || report.duplicateIds.length || report.duplicateNumbers.length) process.exitCode = 1
}

audit().catch(() => { console.error('The content audit failed. Check connectivity and the configured reader credentials.'); process.exitCode = 1 })
