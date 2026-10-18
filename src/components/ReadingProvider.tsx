'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type ReadingState = { saved: number[]; completed: number[] }
type ReadingContextValue = ReadingState & {
  ready: boolean
  persistent: boolean
  toggleSaved: (id: number) => void
  toggleCompleted: (id: number) => void
}
const STORAGE_KEY = 'niti:reading:v1'
const EMPTY: ReadingState = { saved: [], completed: [] }
const Context = createContext<ReadingContextValue | null>(null)

function parseState(raw: string | null): ReadingState {
  if (!raw) return EMPTY
  try {
    const value = JSON.parse(raw)
    const ids = (items: unknown) => Array.isArray(items) ? [...new Set(items.filter((id): id is number => Number.isSafeInteger(id) && id > 0))] : []
    return { saved: ids(value?.saved), completed: ids(value?.completed) }
  } catch { return EMPTY }
}

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReadingState>(EMPTY)
  const [ready, setReady] = useState(false)
  const [persistent, setPersistent] = useState(true)
  useEffect(() => {
    try { setState(parseState(localStorage.getItem(STORAGE_KEY))) } catch { setPersistent(false) }
    setReady(true)
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) setState(parseState(event.newValue))
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { setPersistent(false) }
  }, [state, ready])
  const toggle = useCallback((key: keyof ReadingState, id: number) => {
    setState(previous => ({ ...previous, [key]: previous[key].includes(id) ? previous[key].filter(item => item !== id) : [...previous[key], id] }))
  }, [])
  const toggleSaved = useCallback((id: number) => toggle('saved', id), [toggle])
  const toggleCompleted = useCallback((id: number) => toggle('completed', id), [toggle])
  return <Context.Provider value={{ ...state, ready, persistent, toggleSaved, toggleCompleted }}>{children}</Context.Provider>
}

export function useReading() {
  const context = useContext(Context)
  if (!context) throw new Error('ReadingProvider is required')
  return context
}
