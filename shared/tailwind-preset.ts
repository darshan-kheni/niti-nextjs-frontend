import type { Config } from 'tailwindcss'

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        niti: {
          bg: 'rgb(var(--niti-bg) / <alpha-value>)',
          surface: 'rgb(var(--niti-surface) / <alpha-value>)',
          'surface-hover': 'rgb(var(--niti-surface-hover) / <alpha-value>)',
          gold: 'rgb(var(--niti-gold) / <alpha-value>)',
          border: 'var(--niti-border)',
          'border-hover': 'var(--niti-border-hover)',
          'text-primary': 'rgb(var(--niti-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--niti-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--niti-text-muted) / <alpha-value>)',
          danger: 'rgb(var(--niti-danger) / <alpha-value>)',
          success: 'rgb(var(--niti-success) / <alpha-value>)',
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
