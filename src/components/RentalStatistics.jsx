import { Building2, Users2, ShieldAlert, BadgeCheck } from "lucide-react";

export default function RentalStatistics() {
  const stats = [
    {
      id: 1,
      icon: <Building2 className="text-cyan-400 w-6 h-6" />,
      value: "12,850+",
      label: "Premium Verified Listings",
      borderColor: "hover:border-cyan-500/30"
    },
    {
      id: 2,
      icon: <Users2 className="text-purple-400 w-6 h-6" />,
      value: "45,200+",
      label: "Active Happy Tenants",
      borderColor: "hover:border-purple-500/30"
    },
    {
      id: 3,
      icon: <BadgeCheck className="text-pink-400 w-6 h-6" />,
      value: "99.4%",
      label: "Secure Booking Rate",
      borderColor: "hover:border-pink-500/30"
    },
    {
      id: 4,
      icon: <ShieldAlert className="text-emerald-400 w-6 h-6" />,
      value: "24/7",
      label: "Fraud Protection Guard",
      borderColor: "hover:border-emerald-500/30"
    }
  ];

  return (
    <section className="bg-[#07070a] text-white py-16 px-4 relative overflow-hidden">
      {/* Top Cyber Line Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Statistics Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 ${stat.borderColor}`}
            >
              {/* Glass Icon Container */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                {stat.icon}
              </div>

              {/* Metrics */}
              <div className="space-y-0.5">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}