"use client";

import React from 'react';
import { Calendar, DollarSign, MapPin, ShieldAlert, Clock, XCircle, CheckCircle } from "lucide-react";

const BookingTable = ({ initialBookings }) => {
  const bookings = Array.isArray(initialBookings) ? initialBookings : [initialBookings];

  return (
    <div className="w-full bg-transparent border border-white/[0.08] rounded-xl overflow-hidden">
      {bookings.length === 0 || !bookings[0] ? (
        <div className="text-center py-16 bg-transparent">
          <p className="text-sm text-slate-400 font-mono">No bookings found.</p>
        </div>
      ) : (
        /* Smooth Responsive Scroll Wrapper */
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/[0.08]">
          <table className="w-full min-w-[900px] text-left border-collapse">
            
            {/* Seamless Lightened Header */}
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                <th className="py-4 px-6 text-xs font-semibold tracking-wider text-slate-300 uppercase">Property Title</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Location</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Move In Date</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Price</th>
                <th className="py-4 px-4 text-xs font-semibold tracking-wider text-slate-300 uppercase">Payment Status</th>
                <th className="py-4 px-6 text-xs font-semibold tracking-wider text-slate-300 uppercase">Booking Status</th>
              </tr>
            </thead>

            {/* High Contrast Blended Rows */}
            <tbody className="divide-y divide-white/[0.06] bg-transparent">
              {bookings.map((item) => {
                const isPaid = item.paymentStatus?.toLowerCase() === 'paid';
                const status = item.bookingStatus?.toLowerCase();

                return (
                  <tr 
                    key={item._id?.["$oid"] || item._id} 
                    className="hover:bg-white/[0.04] transition-colors duration-150"
                  >
                    {/* Title & User Info */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-white tracking-wide text-sm">
                          {item.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 mt-1">
                          User: <span className="text-slate-300">{item.userName}</span> ({item.userEmail})
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-sm text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-slate-400 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </td>

                    {/* Move In Date */}
                    <td className="py-4 px-4 text-sm text-slate-200 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-slate-400 shrink-0" />
                        <span>{item.moveInDate}</span>
                      </div>
                    </td>

                    {/* Price - Glowing Cyan */}
                    <td className="py-4 px-4 text-sm font-extrabold font-mono text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.2)]">
                      <div className="flex items-center">
                        <DollarSign className="size-4 shrink-0" />
                        <span>{item.price}</span>
                      </div>
                    </td>

                    {/* Payment Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold font-mono border uppercase tracking-wider ${
                        isPaid 
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                          : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      }`}>
                        <ShieldAlert className="size-3" />
                        {item.paymentStatus}
                      </span>
                    </td>

                    {/* Booking Status Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold border tracking-wide uppercase ${
                        status === 'approved'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : status === 'rejected'
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
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