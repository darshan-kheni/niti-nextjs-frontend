export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <span className="text-4xl" role="img" aria-label="Book">
        📖
      </span>
      <p className="text-niti-text-secondary font-sans text-sm tracking-wide">
        Chapter not found.
      </p>
    </div>
  )
}
