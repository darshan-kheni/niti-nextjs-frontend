import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Niti — A wisdom library',
    short_name: 'Niti',
    description: 'Your personal library of collected insights and book summaries.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F8F7F3',
    theme_color: '#203B32',
    icons: [
      { src: '/brand/niti-app-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/niti-app-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/niti-app-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
