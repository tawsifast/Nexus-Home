"use client";

import { motion } from "framer-motion";
import { Button, Input, Select } from "@heroui/react"; 
import { Search, MapPin, Home, DollarSign } from "lucide-react";

// HeroUI v3-এর জন্য কাস্টম অবজেক্ট ম্যাপিং যাতে কোনো এরর ছাড়াই ড্রপডাউন আইটেম রেন্ডার হয়
const search = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);

export default function BannerSearchForm({ propertyTypes }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-4 md:p-6 rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end text-left"
    >
      {/* Location */}
      <div className="space-y-2">
        <label id="location-label" className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
          <MapPin size={14} /> Location
        </label>
        <Input
          variant="flat"
          placeholder="Where to?"
          aria-labelledby="location-label"
        //   className="dark"
          className={{ inputWrapper: "bg-white/[0.05] hover:bg-white/[0.1]" }}
        />
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label id="type-label" className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1">
          <Home size={14} /> Type
        </label>
        <Select
          placeholder="Property Type"
          variant="flat"
          aria-labelledby="type-label"
        //   className="dark"
          className={{ trigger: "bg-white/[0.05] hover:bg-white/[0.1]" }}
        >
          {propertyTypes.map((type) => (
            // আপনার রিকোয়ারমেন্ট অনুযায়ী এখানে <search> ট্যাগ ব্যবহার করা হয়েছে
            <search key={type} value={type} className="text-black dark:text-white">
              {type}
            </search>
          ))}
        </Select>
      </div>

      {/* Min Price */}
      <div className="space-y-2">
        <label id="min-price-label" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <DollarSign size={14} /> Min Price
        </label>
        <Input
          type="number"
          variant="flat"
          placeholder="$ Min"
          aria-labelledby="min-price-label"
        //   className="dark"
          className={{ inputWrapper: "bg-white/[0.05] hover:bg-white/[0.1]" }}
        />
      </div>

      {/* Max Price */}
      <div className="space-y-2">
        <label id="max-price-label" className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <DollarSign size={14} /> Max Price
        </label>
        <Input
          type="number"
          variant="flat"
          placeholder="$ Max"
          aria-labelledby="max-price-label"
        //   className="dark"
          className={{ inputWrapper: "bg-white/[0.05] hover:bg-white/[0.1]" }}
        />
      </div>

      {/* Search Button */}
      <Button
        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300"
        startContent={<Search size={18} />}
      >
        Search
      </Button>
    </motion.div>
  );
}