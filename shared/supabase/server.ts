import { createServerClient as _createServerClient } from '@supabase/ssr'

type CookieStore = {
  getAll(): { name: string; value: string }[]
  set(name: string, value: string, options?: Record<string, unknown>): void
}

/**
 * Creates a Supabase server client. Accepts a cookieStore parameter
 * to avoid importing next/headers directly (keeps shared/ decoupled).
 *
 * Usage in Next.js Server Components / Actions:
 *   import { cookies } from 'next/headers'
 *   const supabase = createServerClient(cookies())
 */
export function createServerClient(cookieStore: CookieStore) {
  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {} // Server Components can't set cookies
        },
      },
    }
  )
}
