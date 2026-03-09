import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #C8A44E 0%, #92751A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#08080B',
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  )
}
