import { createClient } from '@supabase/supabase-js'
import data from '../niti-chapters-data.json'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.')
  process.exit(1)
}

async function seed() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  console.log(`Seeding ${data.length} chapters...`)

  // Mark all seed data as published
  const chapters = (data as Record<string, unknown>[]).map(ch => ({ ...ch, published: true }))

  // Insert in batches of 10
  for (let i = 0; i < chapters.length; i += 10) {
    const batch = chapters.slice(i, i + 10)
    const { error } = await supabase.from('chapters').insert(batch)
    if (error) {
      console.error(`Batch ${i} failed:`, error.message)
      process.exit(1)
    }
    console.log(`  Inserted ${i + batch.length}/${chapters.length}`)
  }

  console.log('Seed complete.')
}

seed().catch(console.error)
