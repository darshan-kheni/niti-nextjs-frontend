export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <span className="text-4xl mb-4" role="img" aria-label="Books">
        &#x1F4DA;
      </span>
      <p className="text-niti-text-secondary font-sans text-sm">
        No chapters match your search.
      </p>
    </div>
  )
}
