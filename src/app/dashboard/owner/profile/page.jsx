import { getUserSession } from "@/lib/core/session";
import React from "react";
import Image from "next/image";
import {
  User,
  ShieldCheck,
  Cpu,
  Terminal,
  Fingerprint,
  Award,
} from "lucide-react";

const OwnerProfilePage = async () => {
  // Fetch user data from session
  const user = await getUserSession();

  // Safe formatting for Date objects or strings
  const formatMemberDate = (dateVal) => {
    if (!dateVal) return "2026-06-07";
    if (dateVal instanceof Date) {
      return dateVal.toISOString().split("T")[0];
    }
    return String(dateVal).split("T")[0];
  };

  const profileData = {
    name: user?.name || "mango",
    email: user?.email || "owner@gmail.com",
    role: user?.role || "owner",
    memberSince: formatMemberDate(user?.createdAt),
    avatar:
      user?.image ||
      "https://pub-c5e31b5cdafb419a86a69d5d340a955c.r2.dev/mock-avatar.png",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 p-4 md:p-8 antialiased selection:bg-purple-500/20 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 1. TOP SECURE ROW: Profile Banner & Identity Header */}
        <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl">
          {/* Banner-Matched Cyber Glows */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Banner-Matched Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Profile Picture (Styled to match your Banner's theme) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left">
              {/* Neon Cyber-Rim Photo Frame */}
              <div className="p-0.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-sm shrink-0">
                <div className="size-24 rounded-lg bg-[#0a0a0f] overflow-hidden flex items-center justify-center border border-white/5">
                  {profileData.avatar ? (
                    <Image
                      src={profileData.avatar.startsWith("//") ? `https:${profileData.avatar}` : profileData.avatar}
                      alt={profileData.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <User className="size-10 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Core Text Info Group */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                    {profileData.name}
                  </h1>
                  <ShieldCheck className="size-5 text-cyan-400 shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
                </div>
                <p className="text-xs text-slate-400 font-sans tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
                  <Terminal className="size-3.5 text-purple-400" /> Core
                  Identity Access Console
                </p>
              </div>
            </div>

            {/* Status Rank Badge */}
            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <div className="inline-flex items-center gap-2 bg-[#0c0c14] border border-purple-500/30 hover:border-cyan-400/50 px-4 py-2 rounded-xl text-slate-100 text-xs font-semibold tracking-wide font-sans shadow-lg shadow-purple-500/5 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300 cursor-pointer group">
                {/* Icon with hover rotation/glow */}
                <Award className="size-4 text-purple-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />

                {/* Clear & readable high-contrast text */}
                <span className="text-slate-200 group-hover:text-white transition-colors duration-300">
                  Access //{" "}
                  <span className="text-purple-300 group-hover:text-cyan-300 uppercase">
                    {profileData.role}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SPECIFICATIONS CONTENT SECTION */}
        <div className="space-y-4">
          {/* Visual Section Line */}
          <div className="flex items-center gap-3 px-1">
            <Cpu className="size-4 text-purple-500/60" />
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
              Identity Specifications Matrix
            </h2>
            <div className="h-[1px] bg-white/5 flex-grow" />
          </div>

          {/* Metric Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 01 - Node Name */}
            <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-5 rounded-xl flex items-start justify-between group hover:border-purple-500/20 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans block">
                  Node Designation
                </span>
                <span className="text-base font-semibold text-slate-200 tracking-wide block">
                  {profileData.name}
                </span>
              </div>
              <div className="text-[10px] font-medium text-purple-400/80 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-md font-sans">
                ID // 01
              </div>
            </div>

            {/* Box 02 - Routing Path Email */}
            <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-5 rounded-xl flex items-start justify-between group hover:border-cyan-500/20 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans block">
                  Routing Path (Email)
                </span>
                <span className="text-base font-semibold text-slate-200 tracking-wide block select-all">
                  {profileData.email}
                </span>
              </div>
              <div className="text-[10px] font-medium text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-md font-sans">
                ID // 02
              </div>
            </div>

            {/* Box 03 - Privileges */}
            <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-5 rounded-xl flex items-start justify-between group hover:border-purple-500/20 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans block">
                  Security Permissions
                </span>
                <span className="text-base font-semibold text-slate-300 tracking-wide uppercase block">
                  {profileData.role}
                </span>
              </div>
              <div className="text-[10px] font-medium text-purple-400/80 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-md font-sans">
                ID // 03
              </div>
            </div>

            {/* Box 04 - Timestamp */}
            <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-5 rounded-xl flex items-start justify-between group hover:border-cyan-500/20 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans block">
                  Initialization Timestamp
                </span>
                <span className="text-base font-semibold text-slate-200 tracking-wide block">
                  {profileData.memberSince}
                </span>
              </div>
              <div className="text-[10px] font-medium text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-md font-sans">
                ID // 04
              </div>
            </div>
          </div>
        </div>

        {/* 3. CONSOLE FOOTER STATUS COMPONENT */}
        <div className="p-4 bg-[#0c0c14]/40 border border-white/5 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/5 text-purple-400 border border-purple-500/10 rounded-xl">
              <Fingerprint className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold font-sans tracking-wide text-slate-300">
                System Status Overview
              </p>
              <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                Secure dashboard session configuration token verified and
                validated.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 select-none shrink-0 font-sans">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SHELL_SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
