export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 pt-28 pb-20 px-4 md:px-8 relative overflow-hidden flex flex-col items-center">
      
      {/* Matching Ambient Cyber Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size-32px_32px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-8 animate-pulse">
        {/* Header Block Skeleton */}
        <div className="border-b border-white/5 pb-6 space-y-3">
          <div className="h-10 w-2/3 md:w-1/3 bg-white/10 rounded-xl" />
          <div className="h-4 w-full md:w-1/2 bg-white/5 rounded-lg" />
        </div>

        {/* Filter Deck Skeleton */}
        <div className="backdrop-blur-xl bg-[#0c0c14]/40 border border-white/5 rounded-2xl p-6 h-24 w-full" />

        {/* Card Mock Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="backdrop-blur-xl bg-white/2 border border-white/5 rounded-2xl overflow-hidden h-95 space-y-4 p-4 flex flex-col justify-between">
              <div className="w-full h-48 bg-white/5 rounded-xl" />
              <div className="space-y-2 flex-1 pt-2">
                <div className="h-5 w-3/4 bg-white/10 rounded-md" />
                <div className="h-4 w-1/2 bg-white/5 rounded-md" />
              </div>
              <div className="h-10 w-full bg-white/5 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}