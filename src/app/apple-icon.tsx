import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: 'linear-gradient(135deg, #C8A44E 0%, #92751A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 110,
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
