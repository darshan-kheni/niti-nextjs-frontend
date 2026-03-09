'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <span className="text-4xl" role="img" aria-label="Warning">
        ⚠️
      </span>
      <h2 className="text-niti-text-primary font-sans text-lg font-medium">
        Something went wrong
      </h2>
      <p className="text-niti-text-secondary font-sans text-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-md bg-niti-gold px-5 py-2 font-sans text-sm font-medium text-niti-bg transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  )
}
