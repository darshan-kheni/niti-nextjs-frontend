import { CATEGORIES } from '@shared/constants'
import type { Chapter } from '@shared/types'

export function chapterNumber(chapter: Pick<Chapter, 'id' | 'num'>) {
  return Number(chapter.num.replace(/[^0-9]/g, '')) || chapter.id
}

export function categoryFor(chapter: Chapter) {
  return CATEGORIES.find(category => category.filter.includes(chapterNumber(chapter)))
}

export function readingMinutes(chapter: Chapter) {
  const words = chapter.sections.reduce((total, section) =>
    total + section.heading.split(/\s+/).length + section.points.reduce((sum, point) => sum + point.trim().split(/\s+/).length, 0), 0)
  return Math.max(1, Math.ceil(words / 200))
}

export function excerpt(chapter: Chapter) {
  return chapter.sections.flatMap(section => section.points).find(point => point.length > 60)
    || chapter.sections[0]?.points[0] || 'Explore the ideas in this summary.'
}

export const coverPalettes = [
  { background: '#29483B', foreground: '#F2E9CE', accent: '#BCA36B' },
  { background: '#783D45', foreground: '#F6E9D5', accent: '#C5A37C' },
  { background: '#D8D2BE', foreground: '#343E32', accent: '#777B59' },
  { background: '#34465B', foreground: '#F1EADC', accent: '#ADBAC5' },
  { background: '#82583E', foreground: '#F5E9D3', accent: '#CBAC7C' },
  { background: '#505B4A', foreground: '#F3EAD8', accent: '#B9C5A4' },
]

export function coverPalette(chapter: Chapter) {
  return coverPalettes[(chapterNumber(chapter) - 1) % coverPalettes.length]
}
