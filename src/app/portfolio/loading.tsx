export default function PortfolioLoading() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background animate-pulse">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="w-64 md:w-96 h-12 md:h-16 rounded-lg bg-surface-subtle mx-auto mb-6" />
          <div className="w-full max-w-xl h-4 rounded bg-surface-subtle mx-auto mb-2" />
          <div className="w-3/4 max-w-md h-4 rounded bg-surface-subtle mx-auto" />
        </div>

        {/* Filters Placeholder */}
        <div className="flex justify-center gap-8 mb-16">
          <div className="w-12 h-6 rounded bg-accent/20" />
          <div className="w-24 h-6 rounded bg-surface-subtle" />
          <div className="w-24 h-6 rounded bg-surface-subtle" />
        </div>

        {/* Project Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden">
              <div className="aspect-[4/5] rounded-xl bg-surface-muted mb-4" />
              <div className="w-3/4 h-6 rounded bg-surface-subtle mb-2" />
              <div className="w-1/3 h-4 rounded bg-surface-subtle" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

