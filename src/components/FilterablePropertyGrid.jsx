"use client";

import React, { useState } from "react";
// FIXED: Imported Label directly from @heroui/react
import { SearchField, Select, ListBox, Label } from "@heroui/react";
import { SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from "lucide-react";
import PropertyCard from "./property/PropertyCard";
import { useRouter } from "next/navigation";

export default function FilterablePropertyGrid({ approvedProperties = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();
  console.log(searchQuery, selectedType, sortOrder);

  const handleApplyFilters = async () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    if (selectedType) {
      params.set("type", selectedType);
    }
    if (sortOrder) {
      params.set("order", sortOrder);
    }
    router.push(`/all-client/all-properties?${params.toString()}`);
  };

  const handleResets = () =>{
    setSearchQuery("");
    setSelectedType("");
    setSortOrder("")
    router.push("/all-client/all-properties");
  }

  // Safe Fallback: Since frontend useMemo is disabled, we map straight to the 
  // server-provided properties filtered dynamically through your URL parameters.
  const displayProperties = approvedProperties;

  return (
    <div className="space-y-8">
      {/* Cohesive Filter Deck Panel */}
      <div className="backdrop-blur-xl bg-[#0c0c14]/60 border border-white/5 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-end gap-5">
        
        {/* Search Field */}
        <div className="flex-1">
          <SearchField 
            name="search" 
            value={searchQuery} 
            onChange={(value) => setSearchQuery(value)}
            className="w-full flex flex-col gap-1.5"
          >
            {/* FIXED: Changed from <label> to HeroUI's <Label> */}
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              📍 Search by Location
            </Label>
            <SearchField.Group className="bg-white/2 hover:bg-white/4 focus-within:bg-white/5 border border-white/5 focus-within:border-cyan-500/50 rounded-xl h-11 flex items-center px-3 transition-all">
              <SearchField.SearchIcon className="text-slate-500 size-4 shrink-0 mr-2" />
              <SearchField.Input 
                className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600 font-sans" 
                placeholder="Enter city, region, or area address..." 
              />
              <SearchField.ClearButton className="text-slate-500 hover:text-white transition-colors cursor-pointer ml-2" />
            </SearchField.Group>
          </SearchField>
        </div>

        {/* Dropdowns & Trigger Group */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch lg:items-end">
          
          {/* Typology Dropdown */}
          <div className="w-full sm:w-[180px]">
            <Select 
              className="w-full flex flex-col gap-1.5" 
              placeholder="All Typologies"
              selectedKey={selectedType}
              onSelectionChange={(key) => setSelectedType(String(key))}
            >
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="size-3 text-purple-400" />
                <span>Property Type</span>
              </Label>
              <Select.Trigger className="bg-white/2 hover:bg-white/4 border border-white/5 text-slate-200 rounded-xl h-11 px-3 flex items-center justify-between text-sm transition-colors cursor-pointer">
                <Select.Value />
                <Select.Indicator className="text-slate-500 size-4" />
              </Select.Trigger>
              <Select.Popover className="bg-[#0c0c14] border border-white/10 rounded-xl shadow-2xl overflow-hidden mt-1 text-slate-200 min-w-[180px]">
                <ListBox className="p-1">
                  <ListBox.Item id="all" textValue="All Typologies" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    All Typologies <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="Apartment" textValue="Apartment" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Apartment <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="Villa" textValue="Villa" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Villa <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="Penthouse" textValue="Penthouse" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Penthouse <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="Studio" textValue="Studio" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Studio <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="Cabin" textValue="Cabin" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Cabin <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Sort Metrics Dropdown */}
          <div className="w-full sm:w-[180px]">
            <Select 
              className="w-full flex flex-col gap-1.5" 
              placeholder="Default Order"
              selectedKey={sortOrder}
              onSelectionChange={(key) => setSortOrder(String(key))}
            >
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowUpDown className="size-3 text-cyan-400" />
                <span>Sort Matrix</span>
              </Label>
              <Select.Trigger className="bg-white/2 hover:bg-white/4 border border-white/5 text-slate-200 rounded-xl h-11 px-3 flex items-center justify-between text-sm transition-colors cursor-pointer">
                <Select.Value />
                <Select.Indicator className="text-slate-500 size-4" />
              </Select.Trigger>
              <Select.Popover className="bg-[#0c0c14] border border-white/10 rounded-xl shadow-2xl overflow-hidden mt-1 text-slate-200 min-w-[180px]">
                <ListBox className="p-1">
                  <ListBox.Item id="none" textValue="Default Order" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Default Order <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="low-to-high" textValue="Price: Low to High" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Price: Low to High <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                  <ListBox.Item id="high-to-low" textValue="Price: High to Low" className="p-2.5 rounded-lg text-sm hover:bg-white/5 cursor-pointer flex items-center justify-between">
                    Price: High to Low <ListBox.ItemIndicator className="text-cyan-400" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Action Apply Button */}
          {/* Action Row containing Glow Button and Reset Component */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Reset Button */}
            <button
              type="button"
              onClick={handleResets}
              className="h-11 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm active:scale-95"
              title="Reset Filters"
            >
              <RotateCcw className="size-4" />
              <span className="sm:hidden lg:inline">Reset</span>
            </button>

            {/* Glowing Search Apply Button */}
            <button
              type="button"
              onClick={handleApplyFilters}
              className="flex-1 sm:flex-initial h-11 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] border border-cyan-400/20 transition-all cursor-pointer active:scale-[0.98]"
            >
              <Search className="size-4" />
              <span>Apply Filters</span>
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic Results Grid */}
      {displayProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {displayProperties.map((property) => (
            <PropertyCard key={property._id?.$oid || property._id} property={property} />
          ))}
        </div>
      ) : (
        /* Empty Filter Fallback */
        <div className="backdrop-blur-xl bg-white/2 border border-white/5 rounded-3xl p-16 text-center max-w-lg mx-auto space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-xl mx-auto">
            🔍
          </div>
          <h3 className="text-xl font-bold text-slate-300">No Premium Matches Found</h3>
          <p className="text-slate-500 text-xs max-w-xs mx-auto leading-relaxed">
            We couldn`t find any approved assets matching your specific search parameters. Try clearing the filters.
          </p>
        </div>
      )}
    </div>
  );
}