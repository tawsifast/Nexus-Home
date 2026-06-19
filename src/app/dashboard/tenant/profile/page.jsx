import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { User, Mail, Shield, Calendar, CheckCircle2, XCircle } from 'lucide-react';

const TenantProfilePage = async () => {
    // Fetch user data from session
    const user = await getUserSession();

    // Safe formatting for Date objects or strings
    const formatMemberDate = (dateVal) => {
        if (!dateVal) return "2026-06-17";
        // Handle MongoDB $date structure if directly exposed or standard date strings
        const actualDate = dateVal?.$date || dateVal;
        if (!actualDate) return "2026-06-17";
        if (actualDate instanceof Date) {
            return actualDate.toISOString().split('T')[0];
        }
        return String(actualDate).split('T')[0];
    };

    const profileData = {
        name: user?.name || "Mitsuha",
        email: user?.email || "mitsuha@gmail.com",
        role: user?.role || "tenant",
        emailVerified: user?.emailVerified ?? false,
        memberSince: formatMemberDate(user?.createdAt), 
        avatar: user?.image || "https://images.unsplash.com/photo-1567818735868-e71b99932e29"
    };

    return (
        <div className="min-h-screen bg-[#030307] text-slate-100 pb-16 antialiased">
            
            {/* Top Banner Wrapper */}
            <div className="relative h-48 bg-[#0a0a14] border-b border-white/5">
                
                {/* Profile Image Centered Safely over the banner line */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-10">
                    <div className="p-1 rounded-full bg-[#030307] border border-white/10 shadow-xl">
                        <div className="size-32 rounded-full bg-[#11111f] overflow-hidden flex items-center justify-center border-4 border-[#030307]">
                            {profileData.avatar ? (
                                <img 
                                    src={profileData.avatar} 
                                    alt={profileData.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="size-14 text-slate-500" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Identity Headers */}
            <div className="mt-20 text-center px-4 space-y-2.5">
                <h1 className="text-3xl font-bold tracking-tight text-white capitalize">
                    {profileData.name}
                </h1>
                
                <div className="flex justify-center items-center gap-2">
                    {/* Role Badge */}
                    <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-300 text-xs font-medium uppercase tracking-wider">
                        <User className="size-3 text-blue-400" />
                        {profileData.role}
                    </span>

                    {/* Verification Status Badge */}
                    {profileData.emailVerified ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-emerald-400 text-xs font-medium">
                            <CheckCircle2 className="size-3" /> Verified
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full text-amber-400 text-xs font-medium">
                            <XCircle className="size-3" /> Pending Verification
                        </span>
                    )}
                </div>
            </div>

            {/* Account Details Specs Sheet Grid */}
            <div className="max-w-4xl mx-auto mt-12 px-6">
                
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">
                    Tenant Credentials
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Node Profile Name */}
                    <div className="bg-[#09090f] border border-white/5 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                        <div className="p-3 bg-white/5 rounded-lg text-slate-400">
                            <User className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Legal Full Name</p>
                            <p className="text-base font-semibold text-slate-200 mt-0.5">{profileData.name}</p>
                        </div>
                    </div>

                    {/* Node Route Email */}
                    <div className="bg-[#09090f] border border-white/5 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                        <div className="p-3 bg-white/5 rounded-lg text-slate-400">
                            <Mail className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Linked Email Address</p>
                            <p className="text-base font-semibold text-slate-200 mt-0.5 select-all">{profileData.email}</p>
                        </div>
                    </div>

                    {/* Clearance Matrix Type */}
                    <div className="bg-[#09090f] border border-white/5 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                        <div className="p-3 bg-white/5 rounded-lg text-slate-400">
                            <Shield className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">System Privilege Clearance</p>
                            <p className="text-base font-semibold text-slate-200 mt-0.5 uppercase tracking-wider text-xs font-mono">{profileData.role}</p>
                        </div>
                    </div>

                    {/* Registry Date */}
                    <div className="bg-[#09090f] border border-white/5 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                        <div className="p-3 bg-white/5 rounded-lg text-slate-400">
                            <Calendar className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Account Registry Timestamp</p>
                            <p className="text-base font-semibold text-slate-200 mt-0.5 font-mono">{profileData.memberSince}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TenantProfilePage;