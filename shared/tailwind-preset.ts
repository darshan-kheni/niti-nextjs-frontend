import type { Config } from 'tailwindcss'

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        niti: {
          bg: '#08080B',
          surface: '#101015',
          'surface-hover': '#16161D',
          gold: '#C8A44E',
          border: 'rgba(200,164,78,0.07)',
          'border-hover': 'rgba(200,164,78,0.22)',
          'text-primary': '#EAE5D8',
          'text-secondary': '#9E9788',
          'text-muted': '#5A5548',
          danger: '#C84E4E',
          success: '#4EC870',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'toast-slide': 'toastSlide 0.3s ease',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        toastSlide: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}

export default preset
