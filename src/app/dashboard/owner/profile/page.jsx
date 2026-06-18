import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { User, Mail, ShieldAlert, Calendar, LayoutDashboard, Award, ShieldCheck, Cpu, Terminal, Fingerprint, Activity } from 'lucide-react';

const OwnerProfilePage = async () => {
    // Fetch user data from session
    const user = await getUserSession();

    // Safe formatting for Date objects or strings
    const formatMemberDate = (dateVal) => {
        if (!dateVal) return "2026-06-07";
        if (dateVal instanceof Date) {
            return dateVal.toISOString().split('T')[0];
        }
        return String(dateVal).split('T')[0];
    };

    const profileData = {
        name: user?.name || "mango",
        email: user?.email || "owner@gmail.com",
        role: user?.role || "owner",
        memberSince: formatMemberDate(user?.createdAt), 
        avatar: user?.image || "https://pub-c5e31b5cdafb419a86a69d5d340a955c.r2.dev/mock-avatar.png"
    };

    return (
        <div className="min-h-screen bg-[#030307] text-slate-100 p-6 sm:p-8 antialiased selection:bg-white/10 selection:text-white">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* 1. TOP SECURE ROW: Profile Banner & Identity Header combined safely into one fluid flow block */}
                <div className="bg-[#09090f] border border-white/5 rounded-xl p-6 relative overflow-hidden">
                    {/* Micro subtle grid texture locked inside the block background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        
                        {/* Profile Picture + Identity Labels */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left">
                            
                            {/* Absolute safe container wrapper preventing overflow clipping */}
                            <div className="p-1 rounded-xl bg-white/[0.02] border border-white/10 shadow-xl backdrop-blur-sm shrink-0">
                                <div className="size-24 rounded-lg bg-[#030307] overflow-hidden flex items-center justify-center border border-white/5">
                                    {profileData.avatar ? (
                                        <img 
                                            src={profileData.avatar} 
                                            alt={profileData.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="size-10 text-slate-600" />
                                    )}
                                </div>
                            </div>

                            {/* Core Text Info Group */}
                            <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-mono">
                                        {profileData.name}
                                    </h1>
                                    <ShieldCheck className="size-5 text-slate-400 shrink-0" />
                                </div>
                                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                                    <Terminal className="size-3" /> Core Identity Access Console
                                </p>
                            </div>
                        </div>

                        {/* Status Rank Badge */}
                        <div className="w-full md:w-auto flex justify-center md:justify-end">
                            <div className="inline-flex items-center gap-2 bg-amber-500/5 border border-amber-500/20 px-3 py-1.5 rounded text-amber-400 text-xs font-mono tracking-widest uppercase shadow-sm">
                                <Award className="size-3.5" />
                                <span>Access // {profileData.role}</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 2. SPECIFICATIONS CONTENT SECTION */}
                <div>
                    {/* Visual Section Line */}
                    <div className="flex items-center gap-3 mb-5 px-1">
                        <Cpu className="size-4 text-slate-500" />
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                            Identity Specifications Matrix
                        </h2>
                        <div className="h-[1px] bg-white/5 flex-grow" />
                    </div>

                    {/* Metric Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Box 01 - Node Name */}
                        <div className="bg-[#09090f] border border-white/5 p-5 rounded-lg flex items-start justify-between group hover:border-white/10 transition-all duration-200">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Node Designation</span>
                                <span className="text-base font-bold text-slate-200 font-mono tracking-wide block">{profileData.name}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 bg-white/[0.02] border border-white/5 px-1.5 py-0.5 rounded">ID // 01</div>
                        </div>

                        {/* Box 02 - Routing Path Email */}
                        <div className="bg-[#09090f] border border-white/5 p-5 rounded-lg flex items-start justify-between group hover:border-white/10 transition-all duration-200">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Routing Path (Email)</span>
                                <span className="text-base font-bold text-slate-200 font-mono tracking-wide block select-all">{profileData.email}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 bg-white/[0.02] border border-white/5 px-1.5 py-0.5 rounded">ID // 02</div>
                        </div>

                        {/* Box 03 - Privileges */}
                        <div className="bg-[#09090f] border border-white/5 p-5 rounded-lg flex items-start justify-between group hover:border-white/10 transition-all duration-200">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Security Permissions</span>
                                <span className="text-base font-bold text-slate-300 font-mono tracking-widest uppercase block">{profileData.role}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 bg-white/[0.02] border border-white/5 px-1.5 py-0.5 rounded">ID // 03</div>
                        </div>

                        {/* Box 04 - Timestamp */}
                        <div className="bg-[#09090f] border border-white/5 p-5 rounded-lg flex items-start justify-between group hover:border-white/10 transition-all duration-200">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Initialization Timestamp</span>
                                <span className="text-base font-bold text-slate-200 font-mono tracking-wide block">{profileData.memberSince}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 bg-white/[0.02] border border-white/5 px-1.5 py-0.5 rounded">ID // 04</div>
                        </div>

                    </div>
                </div>

                {/* 3. CONSOLE FOOTER STATUS COMPONENT */}
                <div className="p-4 bg-[#09090f]/50 border border-white/5 rounded-lg flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 text-slate-400 border border-white/5 rounded">
                            <Fingerprint className="size-4" />
                        </div>
                        <div>
                            <p className="text-xs font-bold font-mono tracking-wide text-slate-300 uppercase">System Status Overview</p>
                            <p className="text-[11px] font-mono text-slate-500 mt-0.5">Secure dashboard session configuration token verified and validated.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/5 select-none shrink-0">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>SHELL_SECURE</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OwnerProfilePage;