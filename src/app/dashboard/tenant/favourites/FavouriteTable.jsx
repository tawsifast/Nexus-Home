"use client";

import React, { useState } from 'react';
import { Trash2, MapPin, Bed, Bath, Building } from "lucide-react";
import toast from "react-hot-toast";
import { deleteFavourite } from '@/lib/api/favourite';

const FavouriteTable = ({ initialFavorites }) => {
  const [favorites, setFavorites] = useState(initialFavorites || []);

  const idFor = (item) => item._id?.["$oid"] || item._id || item.id;

  const handleRemoveFavorite = async (id, title) => {
    try {
      await deleteFavourite(id);
      setFavorites(prev => prev.filter(item => idFor(item) !== id));
      toast.success(`Removed "${title}" from favorites`);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 max-w-full">
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-transparent">
          <p className="text-sm text-slate-400 font-mono">No favorite properties found.</p>
        </div>
      ) : (
        /* Smooth Responsive Scroll Wrapper */
        <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <table className="w-full min-w-[850px] text-left border-collapse">
            
            {/* Slate Header */}
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90">
                <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Property</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Type</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Location</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Specs</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Rent Price</th>
                <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase text-right">Actions</th>
              </tr>
            </thead>

            {/* Obsidian Glass Rows */}
            <tbody className="divide-y divide-slate-800/60 bg-transparent">
              {favorites.map((item, index) => (
                <tr 
                  key={item._id?.["$oid"] || item._id || item.id || `favourite-${index}`} 
                  className="hover:bg-cyan-950/20 transition-all duration-200 group"
                >
                  
                  {/* Title Cell */}
                  <td className="py-4 px-6 align-middle">
                    <span className="font-bold text-slate-100 tracking-wide text-sm block truncate group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </span>
                  </td>

                  {/* Type Badge */}
                  <td className="py-4 px-4 align-middle">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/30 uppercase tracking-wider whitespace-nowrap">
                      <Building className="size-3 text-cyan-400" />
                      {item.type}
                    </span>
                  </td>

                  {/* Location Cell */}
                  <td className="py-4 px-4 align-middle text-sm text-slate-300">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="size-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </td>

                  {/* Specs Cell */}
                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <Bed className="size-3.5 text-cyan-400" /> {item.bedroom} Bed
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="size-3.5 text-cyan-400" /> {item.bathroom} Bath
                      </span>
                    </div>
                  </td>

                  {/* Rent Price */}
                  <td className="py-4 px-4 align-middle whitespace-nowrap text-sm font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]">
                    ${item.rentPrice?.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/mo</span>
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-6 align-middle text-right whitespace-nowrap">
                    <button
                      onClick={() => handleRemoveFavorite(item._id?.["$oid"] || item._id || item.id, item.title)}
                      className="inline-flex items-center gap-1.5 bg-rose-950/30 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-800/40 hover:border-rose-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
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