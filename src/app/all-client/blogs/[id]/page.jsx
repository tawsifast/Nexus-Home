import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";

const blogData = {
  "1": {
    title: "5 Things to Inspect Before Renting a Premium Duplex",
    content: `When renting luxury spaces, telemetry and documentation inspection are critical. First, always verify the landlord's digital signatures and property deed records. Second, check the integrated smart utility systems (AC, security hubs) to ensure real-time API logs are active.`,
    author: "Levi Ackerman",
    date: "Jun 24, 2026",
    category: "Guides",
    readTime: "5 min read"
  },
  "2": {
    title: "The Rise of Smart Ecosystems in Urban Living Spaces",
    content: `How automated digital locks and real-time utility tracking are reshaping modern millennial properties. The integration of IoT frameworks within residential architecture is no longer a luxury.`,
    author: "Eren Yeager",
    date: "Jun 20, 2026",
    category: "Technology",
    readTime: "4 min read"
  },
  "3": {
    title: "Why Fixed-Term Sublet Insurances Matter in 2026",
    content: `Protecting your rental deposit via verified payout sessions. A developer-turned-tenant perspective. Navigating decentralized tenancy layouts requires more than just a verified signature.`,
    author: "Mikasa Ackerman",
    date: "Jun 15, 2026",
    category: "Finance",
    readTime: "7 min read"
  }
};

export default async function BlogPostDetailPage({ params }) {
  const { id } = await params;
  const post = blogData[id];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#030307] text-white p-6 md:p-16 antialiased">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 🛠️ ফিক্সড ব্যাক বাটন: এখানে /blog এর জায়গায় /blogs করা হয়েছে */}
        <Link 
          href="/all-client/blogs" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> 
          Back to Articles
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/10">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs text-slate-400 border-y border-white/[0.05] py-3 font-light">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-cyan-400" /> By {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="text-sm md:text-base text-slate-300 font-light leading-relaxed space-y-6 whitespace-pre-line text-left">
          {post.content}
        </div>

      </div>
    </div>
  );
}