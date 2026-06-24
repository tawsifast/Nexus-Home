"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Input, Select, ListBox, Label } from "@heroui/react";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

export default function BannerSearchForm({ propertyTypes }) {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) params.set("search", location.trim());
    if (selectedType && selectedType !== "all") params.set("type", selectedType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    params.set("page", "1");

    router.push(`/all-client/all-properties?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-4 md:p-6 rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end text-left"
    >
      {/* Location Input */}
      <div className="space-y-2">
        <label
          id="location-label"
          className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1"
        >
          <MapPin size={14} /> Location
        </label>
        <Input
          variant="flat"
          placeholder="Where to?"
          aria-labelledby="location-label"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={{ inputWrapper: "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200" }}
        />
      </div>

      {/* HeroUI Custom Composition Property Type Dropdown */}
      <div className="space-y-2">
        <Select 
          placeholder="Select Type"
          selectedKey={selectedType}
          onSelectionChange={(key) => setSelectedType(String(key))}
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1">
            <Home size={14} /> Type
          </Label>
          <Select.Trigger className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/5 text-slate-200 rounded-xl h-10 px-3 flex items-center justify-between text-sm transition-colors cursor-pointer w-full">
            <Select.Value />
            <Select.Indicator className="text-slate-500 size-4" />
          </Select.Trigger>
          <Select.Popover className="bg-[#0c0c14] border border-white/10 rounded-xl shadow-2xl overflow-hidden mt-1 text-slate-200 min-w-[200px]">
            <ListBox className="p-1">
              <ListBox.Item
                id="all"
                textValue="All Typologies"
                className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between"
              >
                All Typologies
                <ListBox.ItemIndicator className="text-cyan-400" />
              </ListBox.Item>
              {propertyTypes.map((type) => (
                <ListBox.Item
                  key={type}
                  id={type}
                  textValue={type}
                  className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between"
                >
                  {type}
                  <ListBox.ItemIndicator className="text-cyan-400" />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Min Price Input */}
      <div className="space-y-2">
        <label
          id="min-price-label"
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1"
        >
          <DollarSign size={14} /> Min Price
        </label>
        <Input
          type="number"
          variant="flat"
          placeholder="$ Min"
          aria-labelledby="min-price-label"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={{ inputWrapper: "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200" }}
        />
      </div>

      {/* Max Price Input */}
      <div className="space-y-2">
        <label
          id="max-price-label"
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1"
        >
          <DollarSign size={14} /> Max Price
        </label>
        <Input
          type="number"
          variant="flat"
          placeholder="$ Max"
          aria-labelledby="max-price-label"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={{ inputWrapper: "bg-white/[0.05] hover:bg-white/[0.1] text-slate-200" }}
        />
      </div>

      {/* Search Trigger Button */}
      <Button
        onClick={handleSearch}
        className="w-full h-10 bg-linear-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300"
        startContent={<Search size={18} />}
      >
        Search
      </Button>
    </motion.div>
  );
}