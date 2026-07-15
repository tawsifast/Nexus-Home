"use client";

import React, { useState } from 'react';
import { Trash2, MapPin, Bed, Bath, DollarSign, Building } from "lucide-react";
import toast from "react-hot-toast";
import { deleteFavourite } from '@/lib/api/favourite';

const FavouriteTable = ({ initialFavorites }) => {
  const [favorites, setFavorites] = useState(initialFavorites || []);

  const handleRemoveFavorite = async (id, title) => {
    try {
      await deleteFavourite(id);
      setFavorites(prev => prev.filter(item => item._id !== id && item.id !== id));
      toast.success(`Removed "${title}" from favorites`);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="w-full bg-transparent border border-white/[0.08] rounded-xl overflow-hidden">
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-transparent">
          <p className="text-sm text-slate-400 font-mono">No favorite properties found.</p>
        </div>
      ) : (
        /* Smooth Responsive Scroll Wrapper */
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/[0.08]">
          <table className="w-full min-w-[800px] text-left border-collapse">
            
            {/* Seamless Lightened Header */}
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                <th className="py-4 px-6 text-xs font-semibold tracking-wider text-slate-300 uppercase">Property</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Type</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Location</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Specs</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Rent Price</th>
                <th className="py-4 px-6 text-xs font-semibold tracking-wider text-slate-300 uppercase text-right">Actions</th>
              </tr>
            </thead>

            {/* High Contrast Blended Rows */}
            <tbody className="divide-y divide-white/[0.06] bg-transparent">
              {favorites.map((item) => (
                <tr 
                  key={item._id || item.id} 
                  className="hover:bg-white/[0.04] transition-colors duration-150"
                >
                  
                  {/* Title Cell */}
                  <td className="py-4 px-6">
                    <span className="font-bold text-white tracking-wide text-sm block">
                      {item.title}
                    </span>
                  </td>

                  {/* Type Cell */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-white/[0.06] px-2.5 py-0.5 rounded border border-white/[0.08] uppercase tracking-wider">
                      <Building className="size-3 text-slate-400" />
                      {item.type}
                    </span>
                  </td>

                  {/* Location Cell */}
                  <td className="py-4 px-4 text-sm text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-slate-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </td>

                  {/* Specs Cell */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <Bed className="size-4 text-slate-400" /> {item.bedroom} Bed
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="size-4 text-slate-400" /> {item.bathroom} Bath
                      </span>
                    </div>
                  </td>

                  {/* Pricing - Glowing Cyan */}
                  <td className="py-4 px-4 text-sm font-extrabold font-mono text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.2)]">
                    <div className="flex items-center">
                      <DollarSign className="size-4 shrink-0" />
                      <span>{item.rentPrice?.toLocaleString()}/mo</span>
                    </div>
                  </td>

                  {/* Remove Button Action */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleRemoveFavorite(item._id || item.id, item.title)}
                      className="inline-flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 hover:border-rose-500/50 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-[0_0_10px_rgba(244,63,94,0.05)]"
                    >
                      <Trash2 className="size-3.5" />
                      Remove
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FavouriteTable;