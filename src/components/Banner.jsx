import BannerSearchForm from "./BannerSearchForm";

export default function Banner() {
  const propertyTypes = ["Apartment", "Villa", "Penthouse", "Studio", "Cabin"];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0a0f] text-white px-4">
      {/* Background Cyber Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full text-center space-y-8 memory-optimized">
        {/* Title */}
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400 animate-fade-in">
          Discover Next-Gen <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Living Spaces
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Secure decentralized property rentals with instant booking. Step into the future of housing today.
        </p>

        {/* Injecting the client search bar into the server layer */}
        <BannerSearchForm propertyTypes={propertyTypes} />
      </div>
    </div>
  );
}