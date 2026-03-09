export interface Section {
  heading: string
  points: string[]
}

export interface Chapter {
  id: number
  num: string
  title: string
  subtitle: string | null
  date: string
  icon: string
  color: string
  published: boolean
  sections: Section[]
  created_at?: string
  updated_at?: string
}

export interface ChapterFormData {
  num: string
  title: string
  subtitle: string
  date_start: string
  date_end: string
  icon: string
  color: string
  published: boolean
  sections: Section[]
}

export interface Category {
  name: string
  filter: number[]
  icon: string
}
