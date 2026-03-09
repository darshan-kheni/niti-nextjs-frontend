import { createServerClient as _createServerClient, type CookieOptions } from '@supabase/ssr'

type CookieStore = {
  getAll(): { name: string; value: string }[]
  set(name: string, value: string, options?: CookieOptions): void
}

type CookieToSet = { name: string; value: string; options?: CookieOptions }

export function createServerClient(cookieStore: CookieStore) {
  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet: CookieToSet[]) {
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
