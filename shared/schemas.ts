import { z } from 'zod'

export const sectionSchema = z.object({
  heading: z.string().min(1, 'Heading required'),
  points: z.array(z.string().min(1)).min(1, 'At least one point required'),
})

export const chapterSchema = z.object({
  num: z.string().min(1),
  title: z.string().min(1, 'Title required').max(200),
  subtitle: z.string().max(200).nullable().optional(),
  date: z.string().min(1, 'Date required'),
  icon: z.string().min(1).max(10),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
  published: z.boolean().default(false),
  sections: z.array(sectionSchema).min(1, 'At least one section required'),
})

export type ChapterInput = z.infer<typeof chapterSchema>
