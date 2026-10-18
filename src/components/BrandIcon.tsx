/** Shared book-open artwork from Lucide (ISC), used by the wordmark and app icons. */
export function BookMark({ size = 24, strokeWidth = 1.4, color = 'currentColor' }: { size?: number; strokeWidth?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v16" />
    <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
  </svg>
}

export function BrandAppIcon({ size }: { size: number }) {
  return <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#203B32', position: 'relative' }}>
    {size >= 180 && <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
      <path d="M20 83V37c0-12 8-20 20-20h20c12 0 20 8 20 20v46a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3Z" fill="none" stroke="#B4C5A8" strokeOpacity="0.4" strokeWidth="0.65" />
    </svg>}
    <BookMark size={size * (size < 180 ? 0.7 : 0.49)} strokeWidth={size < 180 ? 1.7 : 1.4} color="#DDC58D" />
  </div>
}
import * as React from 'react'
