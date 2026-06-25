"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import {
  Check,
  X,
  User,
  Building2,
  Calendar,
  DollarSign,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateBooking } from "@/lib/actions/ownerBooking";

const OwnerBookingTable = ({ initialBookings }) => {
  const [bookings, setBookmarks] = useState(initialBookings || []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await updateBooking(id, { bookingStatus: newStatus });
      console.log(res, "res");

      if (!res.modifiedCount) throw new Error("Failed to update status");

      // Update state instantly
      setBookmarks((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, bookingStatus: newStatus } : item,
        ),
      );

      toast.success(`Booking request ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#09090f] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-slate-500 font-mono">
            No booking requests available.
          </p>
        </div>
      ) : (
        /* 🛠️ স্ট্যান্ডার্ড এইচটিএমএল টেবিল উইথ রেসপন্সিভ স্ক্রোল র‍্যাপার */
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="text-slate-400 font-semibold text-xs py-4 px-6">
                  Tenant Information
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Property Information
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Move In Date
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Booking Amount
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Payment Status
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Booking Status
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-6 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                >
                  {/* Tenant Information */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                        <User className="size-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 block text-sm">
                          {item.userName}
                        </span>
                        <span className="text-xs text-slate-500 block font-mono mt-0.5">
                          {item.userEmail}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5 italic">
                          Note: {item.additionalNotes}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property Information */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                        <Building2 className="size-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 block text-sm line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-500 block font-mono mt-0.5">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Move-in Date */}
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-300 font-mono flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-slate-500" />
                      {item.moveInDate}
                    </span>
                  </td>

                  {/* Booking Amount */}
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold font-mono text-emerald-400 flex items-center">
                      <DollarSign className="size-3.5 shrink-0" />
                      {item.price?.toLocaleString()}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold font-mono border uppercase tracking-wider ${
                        item.paymentStatus === "paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* Booking Status Badge Column */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        item.bookingStatus === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : item.bookingStatus === "Rejected"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      <Clock className="size-3.5" /> {item.bookingStatus}
                    </span>
                  </td>

                  {/* Action Triggers */}
                  <td className="py-4 px-6 text-right">
                    {item.bookingStatus === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onPress={() =>
                            handleStatusUpdate(item._id, "Approved")
                          }
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer inline-flex items-center gap-1 transition-all"
                        >
                          <Check className="size-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          onPress={() =>
                            handleStatusUpdate(item._id, "Rejected")
                          }
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer inline-flex items-center gap-1 transition-all"
                        >
                          <X className="size-3.5" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono italic">
                        Action Completed
                      </span>
                    )}
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

export default OwnerBookingTable;