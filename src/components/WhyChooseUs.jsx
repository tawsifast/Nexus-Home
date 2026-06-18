import { ShieldCheck, Zap, Coins } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <ShieldCheck className="text-cyan-400 w-8 h-8" />,
      title: "Secured Trust Network",
      desc: "Every rental contract and reservation payment is backed by high-tier encrypted security, shielding you from any fraudulent listings."
    },
    {
      icon: <Zap className="text-purple-400 w-8 h-8" />,
      title: "Instant Verification",
      desc: "Skip the endless paperwork. Our direct owner-tenant workspace allows zero-delay bookings and real-time confirmations."
    },
    {
      icon: <Coins className="text-pink-400 w-8 h-8" />,
      title: "Transparent Pricing",
      desc: "No hidden middleman fees, no surprise costs. What you estimate on our smart interface is exactly what you pay."
    }
  ];

  return (
    <section className="bg-[#0a0a0f] text-white py-20 px-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-400">
            Why Choose NexusHome
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Experience the evolution of property rentals through an ecosystem engineered for speed, safety, and transparency.
          </p>
        </div>

        {/* Benefits Grid - Equal heights & widths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="p-4 rounded-xl bg-white/[0.04] group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-grow">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}