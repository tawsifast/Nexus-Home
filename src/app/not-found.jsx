import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 relative overflow-hidden flex flex-col items-center justify-center px-4">
      
      {/* Matching Ambient Cyber Glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size-32px_32px] pointer-events-none" />

      {/* Centerpiece Content */}
      <div className="max-w-md w-full relative z-10 text-center space-y-6">
        <div className="space-y-2">
          {/* Neon Gradient Badge */}
          <h1 className="text-8xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-500 via-slate-200 to-cyan-400 tracking-tighter">
            404
          </h1>
          <h3 className="text-xl font-bold text-slate-200 tracking-wide">
            HYPERSPACE LINK BROKEN
          </h3>
          <p className="text-slate-400 font-light text-xs max-w-xs mx-auto leading-relaxed">
            The premium asset data stream or structural domain path you requested does not exist or has been relocated.
          </p>
        </div>

        {/* Cohesive Glowing Redirect Action */}
        <div className="pt-2">
          <Link
            href="/all-client/all-properties"
            className="inline-flex h-11 px-6 rounded-xl bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium text-sm items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-400/20 transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="size-4" />
            <span>Return to Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}