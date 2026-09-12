"use client";

import React, { useState } from "react";
import {
  User,
  Building2,
  Calendar,
  DollarSign,
  Mail,
  Smartphone,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export default function AdminBookingTable({ initialBookings }) {
  const [bookings] = useState(initialBookings || []);

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-transparent">
        <p className="text-sm text-slate-400 font-mono">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 max-w-full">
      <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90">
              <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Tenant Info
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Property Context
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Timeline Metrics
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Financials
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Escrow Status
              </th>
              <th className="py-4 px-6 text-right text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Node Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-transparent">
            {bookings.map((item, index) => {
              const bookingId = item._id?.$oid || item._id || `booking-${index}`;
              const isPaid = item.paymentStatus?.toLowerCase() === "paid";
              const status = item.bookingStatus?.toLowerCase();
              return (
                <tr
                  key={bookingId}
                  className="hover:bg-cyan-950/20 transition-all duration-200 group"
                >
                  {/* Tenant Profile Context */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-cyan-950/50 text-cyan-400 rounded-lg border border-cyan-500/30 shrink-0">
                        <User className="size-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-bold text-slate-100 tracking-wide text-sm truncate block group-hover:text-cyan-400 transition-colors">
                          {item.userName || "Unknown Tenant"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 min-w-0">
                          <Mail className="size-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{item.userEmail}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 min-w-0">
                          <Smartphone className="size-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{item.contactNumber}</span>
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property Destination Context */}
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-3 min-w-0 w-full">
                      <div className="p-2 bg-cyan-950/50 text-cyan-400 rounded-lg border border-cyan-500/30 shrink-0">
                        <Building2 className="size-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-bold text-slate-100 tracking-wide text-sm truncate block group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {item.location}
                        </span>
                        <span className="text-[11px] text-slate-500 block font-mono truncate">
                          Owner: {item.ownerEmail}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Timeline Metrics */}
                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    <div className="space-y-1">
                      <span className="text-sm text-slate-300 font-mono flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar className="size-3.5 text-cyan-400 shrink-0" />
                        In: {formatDate(item.moveInDate)}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono block whitespace-nowrap">
                        Logged: {formatDate(item.bookedAt)}
                      </span>
                    </div>
                  </td>

                  {/* Financial Layout */}
                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    <span className="text-sm font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.25)] flex items-center">
                      <DollarSign className="size-3.5 shrink-0" />
                      {item.price?.toLocaleString()}
                    </span>
                  </td>

                  {/* Payment Status Badge */}
                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border uppercase tracking-wider whitespace-nowrap ${
                      isPaid
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    }`}>
                      {isPaid ? (
                        <CheckCircle className="size-3" />
                      ) : (
                        <Clock className="size-3" />
                      )}
                      {item.paymentStatus || "unpaid"}
                    </span>
                  </td>

                  {/* Booking Lifecycle State */}
                  <td className="py-4 px-6 text-right align-middle whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border uppercase tracking-wider whitespace-nowrap ${
                      status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : status === "rejected"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}>
                      {status === "approved" ? (
                        <CheckCircle className="size-3" />
                      ) : status === "rejected" ? (
                        <XCircle className="size-3" />
                      ) : (
                        <Clock className="size-3" />
                      )}
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