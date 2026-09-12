"use client";

import React from 'react';
import { Calendar, DollarSign, MapPin, ShieldAlert, Clock, XCircle, CheckCircle } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

const BookingTable = ({ initialBookings }) => {
  const bookings = Array.isArray(initialBookings) ? initialBookings : [initialBookings];

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 max-w-full">
      {bookings.length === 0 || !bookings[0] ? (
        <div className="text-center py-16 bg-transparent">
          <p className="text-sm text-slate-400 font-mono">No bookings found.</p>
        </div>
      ) : (
        /* Smooth Responsive Scroll Wrapper */
        <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <table className="w-full min-w-[900px] text-left border-collapse">

            {/* Slate Header */}
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90">
                <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Property Title</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Location</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Move In Date</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Price</th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Payment Status</th>
                <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Booking Status</th>
              </tr>
            </thead>

            {/* Obsidian Glass Rows */}
            <tbody className="divide-y divide-slate-800/60 bg-transparent">
              {bookings.map((item, index) => {
                const isPaid = item.paymentStatus?.toLowerCase() === 'paid';
                const status = item.bookingStatus?.toLowerCase();

                return (
                  <tr
                    key={item._id?.["$oid"] || item._id || `booking-${index}`}
                    className="hover:bg-cyan-950/20 transition-all duration-200 group"
                  >
                    {/* Title & User Info */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-100 tracking-wide text-sm truncate group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 mt-1 truncate">
                          User: <span className="text-slate-300">{item.userName}</span> ({item.userEmail})
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 align-middle text-sm text-slate-300">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="size-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </td>

                    {/* Move In Date */}
                    <td className="py-4 px-4 align-middle whitespace-nowrap text-sm text-slate-300 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-cyan-400 shrink-0" />
                        <span>{formatDate(item.moveInDate)}</span>
                      </div>
                    </td>

                    {/* Price - Glowing Cyan */}
                    <td className="py-4 px-4 align-middle whitespace-nowrap text-sm font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="size-3.5 shrink-0" />
                        <span>{item.price?.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Payment Status Badge */}
                    <td className="py-4 px-4 align-middle whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border uppercase tracking-wider whitespace-nowrap ${
                        isPaid
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        <ShieldAlert className="size-3" />
                        {item.paymentStatus}
                      </span>
                    </td>

                    {/* Booking Status Badge */}
                    <td className="py-4 px-6 align-middle whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border tracking-wider uppercase whitespace-nowrap ${
                        status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : status === 'rejected'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {status === 'approved' ? (
                          <CheckCircle className="size-3" />
                        ) : status === 'rejected' ? (
                          <XCircle className="size-3" />
                        ) : (
                          <Clock className="size-3" />
                        )}
                        {item.bookingStatus}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingTable;