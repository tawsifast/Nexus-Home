import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@heroui/react";

export default function PropertyCard({ property }) {
  const { _id, title, image, location, price, rentType } = property;
   const propertyId = _id?.$oid || _id || "";

  return (
    // কার্ডের বডিকে আরও ক্লিন এবং হালকা বর্ডার দেওয়া হয়েছে
    <div className="backdrop-blur-xl bg-white/2 border border-white/6 hover:border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-full">
      
      {/* ১. ইমেজ এবং রেন্ট টাইপ ব্যাজ */}
      <div className="relative overflow-hidden h-50 w-full bg-slate-800">
        <img
          src={image || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#121824] via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 left-3 backdrop-blur-md bg-black/40 border border-white/10 px-2.5 py-0.5 rounded-md text-[10px] font-medium text-cyan-400 uppercase tracking-widest">
          {rentType || "Monthly"}
        </div>
      </div>

      {/* ২. কোর ইনফরমেশন (প্রাইস, টাইটেল, লোকেশন এবং অ্যাকশন বাটন) */}
      <div className="p-5 grow flex flex-col justify-between space-y-4 text-left">
        <div className="space-y-1.5">
          {/* প্রাইস */}
          <div className="text-xl font-black text-slate-100">
            ${price?.toLocaleString("en-BD")}
            <span className="text-xs text-slate-400 font-light font-sans"> / month</span>
          </div>

          {/* টাইটেল */}
          <h3 className="text-base font-bold text-slate-200 tracking-wide line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>

          {/* লোকেশন */}
          <div className="flex items-center gap-1 text-slate-400 text-xs font-light">
            <MapPin size={12} className="text-purple-400 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* ৩. বাটন */}
        <div className="pt-1">
          <Link href={`/all-client/all-properties/${propertyId}`} className="block w-full">
            <Button
              className="w-full h-10 bg-white/3 hover:bg-linear-to-r hover:from-cyan-500 hover:to-purple-600 border border-white/8 hover:border-transparent text-white font-medium text-xs rounded-xl tracking-wide transition-all duration-300 flex items-center justify-center gap-1 group/btn"
              variant="flat"
            >
              View Details
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}