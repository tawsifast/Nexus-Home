"use client";

import React, { useState } from "react";
import { 
  User, 
  Building2, 
  Calendar, 
  DollarSign, 
  ShieldAlert, 
  Mail, 
  Smartphone 
} from "lucide-react";

export default function AdminBookingTable({ initialBookings }) {
  const [bookings] = useState(initialBookings || []);

  if (bookings.length === 0) {
    return (
      <div className="bg-[#09090f] border border-white/5 rounded-xl py-16 text-center">
        <p className="text-sm text-slate-500 font-mono">
          No active system booking logs found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#09090f] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
      {/* 🛠️ স্ট্যান্ডার্ড এইচটিএমএল টেবিল উইথ রেসপন্সিভ স্ক্রোল র‍্যাপার */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="text-slate-400 font-semibold text-xs py-4 px-6">
                Tenant Info
              </th>
              <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                Property Context
              </th>
              <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                Timeline Metrics
              </th>
              <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                Financials
              </th>
              <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                Escrow Status
              </th>
              <th className="text-slate-400 font-semibold text-xs py-4 px-6 text-right">
                Node Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => {
              const bookingId = item._id?.$oid || item._id || Math.random().toString();
              return (
                <tr 
                  key={bookingId} 
                  className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                >
                  
                  {/* Tenant Profile Context */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                        <User className="size-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-200 block text-sm">
                          {item.userName || "Unknown Tenant"}
                        </span>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Mail className="size-3 text-slate-600" /> {item.userEmail}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Smartphone className="size-3 text-slate-600" /> {item.contactNumber}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property Destination Context */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                        <Building2 className="size-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-medium text-slate-200 block text-sm line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-500 block">
                          {item.location}
                        </span>
                        <span className="text-[10px] text-slate-600 block font-mono">
                          Owner: {item.ownerEmail}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Timeline Metrics */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-slate-500" />
                        In: {item.moveInDate}
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono block">
                        Logged: {item.bookedAt ? new Date(item.bookedAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </td>

                  {/* Financial Layout */}
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold font-mono text-cyan-400 flex items-center">
                      <DollarSign className="size-3.5 shrink-0" />
                      {item.price?.toLocaleString()}
                    </span>
                  </td>

                  {/* Escrow Payment Status Badge */}
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono border uppercase tracking-wider ${
                      item.paymentStatus === "paid"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}>
                      {item.paymentStatus || "unpaid"}
                    </span>
                  </td>

                  {/* Booking Lifecycle State */}
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      item.bookingStatus === "Approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : item.bookingStatus === "Rejected"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      <ShieldAlert className="size-3.5" />
                      {item.bookingStatus || "Pending"}
                    </span>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}