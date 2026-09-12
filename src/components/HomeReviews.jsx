
import { getHomeReviews } from "@/lib/api/review";
import Image from "next/image";
import { Star, Quote, User } from "lucide-react";

export default async function HomeReviews() {
  const latestReviews = await getHomeReviews() || [];

  return (
    <section className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Neon Ambient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase">
            Verified Tenant <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Experiences</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-mono uppercase tracking-widest">
             Real telemetry data from verified citizens
          </p>
        </div>

        {/* Reviews Grid (Max 4 Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latestReviews.slice(0, 4).map((review) => (
            <div
              key={review._id}
              className="backdrop-blur-xl bg-[#111222]/30 border border-white/[0.04] p-5 rounded-2xl flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-4 right-4 text-white/[0.02] group-hover:text-cyan-500/[0.05] size-12 transition-colors pointer-events-none" />
              
              <div className="space-y-3.5">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < review.rating ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]" : "text-slate-800"}
                    />
                  ))}
                </div>

                {/* Comment Paragraph */}
                <p className="text-xs text-slate-400 font-light leading-relaxed italic line-clamp-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* User Meta Data Row */}
              <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-white/[0.04]">
                {review.userImage ? (
                  <Image
                    src={review.userImage.startsWith("//") ? `https:${review.userImage}` : review.userImage}
                    alt={review.userName}
                    width={32}
                    height={32}
                    className="size-8 rounded-full object-cover border border-purple-500/20"
                  />
                ) : (
                  <div className="size-8 rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center text-slate-400">
                    <User size={14} />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate">
                    {review.userName || "Verified Tenant"}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate font-mono">
                    {review.userEmail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {latestReviews.length === 0 && (
          <div className="text-center py-10 border border-dashed border-white/5 rounded-2xl text-slate-600 font-mono text-xs">
             NO FEEDBACK LOGS DISTRIBUTED YET
          </div>
        )}
      </div>
    </section>
  );
}