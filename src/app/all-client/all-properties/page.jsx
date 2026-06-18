import PropertyCard from '@/components/property/PropertyCard';
import { getProperty } from '@/lib/api/property';


export default async function AllPropertyPage() {
  const properties = await getProperty() || [];
  const approvedProperties = properties.filter(p => p.status === "Approved");

  return (
    // ব্যাকগ্রাউন্ড পরিবর্তন: bg-[#121824] (মিনিমাল ডার্ক-স্লেট গ্রে)
    <main className="min-h-screen bg-[#121824] text-slate-100 pt-28 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* গ্লো ইফেক্টগুলোকে একটু সফট করা হয়েছে */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-150 h-100 bg-purple-600/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header Block */}
        <div className="border-b border-white/8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-slate-300 tracking-tight">
              All Listed Properties
            </h1>
            <p className="text-slate-400 font-light text-sm md:text-base">
              Discover verified hyper-modern apartments and premium suites globally.
            </p>
          </div>
          
          {/* Count Badge */}
          <div className="backdrop-blur-md bg-white/4 border border-white/1 px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold tracking-wide text-cyan-400 whitespace-nowrap self-start md:self-auto">
            ⚡ Total Listings: <span className="text-white font-black">{approvedProperties.length}</span> Available
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        {approvedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-16 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/4 flex items-center justify-center text-slate-500 text-xl mx-auto">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-300">No Premium Properties Found</h3>
          </div>
        )}

      </div>
    </main>
  );
}