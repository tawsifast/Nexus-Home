export default function TopLocations() {
  const locations = [
    {
      id: 1,
      city: "Manhattan, NY",
      properties: "140+ Properties",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:col-span-2 md:h-[400px]"
    },
    {
      id: 2,
      city: "Tokyo, Japan",
      properties: "95+ Properties",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:h-[400px]"
    },
    {
      id: 3,
      city: "London, UK",
      properties: "120+ Properties",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:col-span-1 md:h-[400px]"
    },
    {
      id: 4,
      city: "Dubai, UAE",
      properties: "85+ Properties",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:col-span-2 md:h-[400px]"
    }
  ];

  return (
    <section className="bg-[#0a0a0f] text-white py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-400">
            Explore Top Locations
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Find premium rental spaces situated in the most connected and vibrant cyber-hubs across the world.
          </p>
        </div>

        {/* Dynamic Bento-Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`relative rounded-3xl overflow-hidden h-[250px] group border border-white/[0.05] shadow-lg ${loc.gridClass}`}
            >
              {/* Image Overlay with Hover Zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${loc.image})` }}
              />
              {/* Dark Futuristic Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Location Text Details */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex justify-between items-end z-10">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                    {loc.city}
                  </h3>
                  <p className="text-xs text-slate-400 font-light">
                    {loc.properties}
                  </p>
                </div>
                {/* Visual Glow Indicator */}
                <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-cyan-500 group-hover:border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}