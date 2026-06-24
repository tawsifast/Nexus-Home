import PropertyActionBlock from "@/components/property/PropertyActionBlock";
import PropertyReviews from "@/components/PropertyReviews";
import { getAllBookings, getBookingByBuyer } from "@/lib/api/booking";
import { getPropertyById } from "@/lib/api/property";
import { getPropertyReviews } from "@/lib/api/review";
import { getUserSession } from "@/lib/core/session";
import { MapPin, ArrowLeft, ShieldCheck, Sparkles, Building } from "lucide-react";
import Link from "next/link";


export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const user = await getUserSession();
  const property = await getPropertyById(id);
  const initialReviews = await getPropertyReviews(id);
  const allBookings = user?.role?.toLowerCase() === "tenant" && user?.email
  ? await getBookingByBuyer(user.email)
  : [];

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0d111a] flex items-center justify-center text-white">
        <div className="backdrop-blur-md bg-white/[0.01] border border-white/[0.05] p-10 rounded-3xl text-center space-y-4">
          <p className="text-xl font-bold text-slate-400">Property Not Found</p>
          <Link href="/all-client/all-properties" className="text-sm text-cyan-400 hover:underline">
            Back to All Properties
          </Link>
        </div>
      </div>
    );
  }

  // যদি আপনার প্রোপার্টি অবজেক্টে আগে থেকে কোনো রিভিউ এপিআই ডেটা থাকে, তা পাস করুন

  return (
    <main className="min-h-screen bg-[#0d111a] text-slate-100 pt-28 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[400px] bg-purple-600/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation & Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-3 text-left">
            <Link href="/all-client/all-properties" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors group">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to Premium Listings
            </Link>
            <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm font-light">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-purple-400 shrink-0" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12} /> Verified Listing
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Grid Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Visuals & Spec Blocks (2/3 Width) */}
          <div className="lg:col-span-2 space-y-8 text-left">
            
            {/* Cinematic Image Showcase */}
            <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[500px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.3)] group bg-slate-900">
              <img 
                src={property.images || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop"} 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-6 left-6 backdrop-blur-md bg-black/40 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-semibold text-cyan-400 tracking-widest uppercase">
                ✨ {property.rentType || "Premium Space"}
              </div>
            </div>

            {/* Premium Specifications Dashboard */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-wide">
                <Sparkles size={16} className="text-cyan-400" /> Space Architecture
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl transition-all hover:bg-white/[0.02] hover:border-white/[0.08]">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Bedrooms</p>
                  <p className="text-2xl font-black text-slate-200">{property.bedrooms || "0"}</p>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl transition-all hover:bg-white/[0.02] hover:border-white/[0.08]">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Bathrooms</p>
                  <p className="text-2xl font-black text-slate-200">{property.bathrooms || "0"}</p>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl transition-all hover:bg-white/[0.02] hover:border-white/[0.08]">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Square Feet</p>
                  <p className="text-2xl font-black text-cyan-400">{property.propertySize ? `${property.propertySize}` : "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Luxury Description Block */}
            <div className="space-y-3 backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building size={16} className="text-purple-400" /> About This Residence
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {property.description || `Experience refined living in this spectacular property situated at ${property.location}. Engineered with modern infrastructure.`}
              </p>
            </div>

            {/* ২. রিভিউ সেকশন এখানে রেন্ডার করা হলো */}
            <PropertyReviews 
              initialReviews={initialReviews}
              propertyId={id} 
              allBookings={allBookings}
              user={user} 
            />

          </div>

          {/* Right Column: Sticky Pricing & Interactive Actions (1/3 Width) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <PropertyActionBlock property={property} user={user} />
          </div>

        </div>
      </div>
    </main>
  );
}