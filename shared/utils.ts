const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

/**
 * Converts date_start/date_end from HTML date inputs to display format.
 * "2015-11-14" + "" => "Nov 14, 2015"
 * "2015-11-14" + "2015-11-20" => "Nov 14–20, 2015"
 * "2015-11-14" + "2015-12-03" => "Nov 14 – Dec 3, 2015"
 */
export function fmtDateRange(start: string, end?: string): string {
  if (!start) return ""
  const s = new Date(start + "T00:00:00")
  const sDay = s.getDate()
  const sMon = MONTHS[s.getMonth()]
  const sYear = s.getFullYear()

  if (!end || end === start) return `${sMon} ${sDay}, ${sYear}`

  const e = new Date(end + "T00:00:00")
  const eDay = e.getDate()
  const eMon = MONTHS[e.getMonth()]
  const eYear = e.getFullYear()

  if (sYear === eYear && s.getMonth() === e.getMonth()) return `${sMon} ${sDay}–${eDay}, ${sYear}`
  if (sYear === eYear) return `${sMon} ${sDay} – ${eMon} ${eDay}, ${sYear}`
  return `${sMon} ${sDay}, ${sYear} – ${eMon} ${eDay}, ${eYear}`
}

export function pointCount(sections: { points: string[] }[]): number {
  return sections.reduce((sum, s) => sum + s.points.length, 0)
}
