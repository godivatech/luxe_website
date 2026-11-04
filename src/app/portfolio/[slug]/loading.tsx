export default function ProjectLoading() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background animate-pulse">
      <div className="container mx-auto px-6 md:px-12">

        {/* Back Button Skeleton */}
        <div className="inline-flex items-center gap-2 mb-12">
          <div className="w-4 h-4 rounded bg-surface-subtle" />
          <div className="w-32 h-4 rounded bg-surface-subtle" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="mb-16">
          {/* Category Pill */}
          <div className="w-24 h-4 rounded bg-accent/20 mb-4" />

          {/* Title */}
          <div className="w-2/3 max-w-md h-12 md:h-16 rounded-lg bg-surface-subtle mb-12" />

          {/* Hero Image Skeleton */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-surface-muted shadow-[0_8px_30px_rgba(22,21,20,0.06)] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          </div>
        </div>

        {/* Gallery Skeletons */}
        <div className="mb-8">
          <div className="w-48 h-8 rounded bg-surface-subtle mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-muted shadow-[0_8px_30px_rgba(22,21,20,0.06)]"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
