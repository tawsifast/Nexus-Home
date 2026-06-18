import { Star } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Tenant since 2025",
      img: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      comment: "Booking my studio penthouse via NexusHome was incredibly smooth! The payment was secure and the owner approved my move-in request in under an hour."
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Tech Professional",
      img: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment: "The interface is beautiful and far from those clunky old listing sites. Transparent pricing and real-time support make it unmatched."
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Digital Nomad",
      img: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      comment: "As a nomad, I rent places frequently. This is by far the safest platform I've used. Zero hidden fees and instant Stripe-secured verification."
    },
    {
      id: 4,
      name: "David K.",
      role: "Verified Tenant",
      img: "https://i.pravatar.cc/150?img=68",
      rating: 5,
      comment: "No complications, no endless calling. Found the apartment, filtered by price, booked it using Stripe, and received my check-in instructions instantly."
    }
  ];

  return (
    <section className="bg-[#07070a] text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
            Tenant Testimonials
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Hear from verified residents who transitioned to their dream spaces effortlessly.
          </p>
        </div>

        {/* Reviews Grid Layout - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:bg-white/[0.03] hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm font-light italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* User Info Alignment */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                <img 
                  src={review.img} 
                  alt={review.name} 
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-500/50"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{review.name}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}