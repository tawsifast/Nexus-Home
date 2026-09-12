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
  Loader2,
  Mail,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateBooking } from "@/lib/actions/ownerBooking";

const OwnerBookingTable = ({ initialBookings }) => {
  const [bookings, setBookmarks] = useState(initialBookings || []);
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setLoadingId(id);
      const res = await updateBooking(id, { bookingStatus: newStatus });

      if (!res.modifiedCount) throw new Error("Failed to update status");

      setBookmarks((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, bookingStatus: newStatus } : item,
        ),
      );

      toast.success(`Booking request ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full">
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <Building2 className="size-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-400">
            No booking requests available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings.map((item) => {
            const isProcessing = loadingId === item._id;
            const isPending = item.bookingStatus === "Pending";

            return (
              <div
                key={item._id}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group"
              >
                {/* Status Indicator Top Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    item.bookingStatus === "Approved"
                      ? "bg-emerald-500"
                      : item.bookingStatus === "Rejected"
                        ? "bg-rose-500"
                        : "bg-amber-500"
                  }`}
                />

                <div>
                  {/* Top Header: Property Title & Price */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block mb-1">
                        Property
                      </span>
                      <h3 className="font-bold text-slate-100 text-base line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {item.location}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono text-emerald-400 block mb-0.5">
                        Amount
                      </span>
                      <span className="text-lg font-extrabold text-emerald-400 font-mono">
                        ${item.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-800/60 my-4" />

                  {/* Tenant Details */}
                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2 text-slate-300 text-xs">
                      <User className="size-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-200">
                        {item.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Mail className="size-3.5 text-slate-500 shrink-0" />
                      <span className="font-mono truncate">
                        {item.userEmail}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-xs">
                      <Calendar className="size-3.5 text-slate-400 shrink-0" />
                      <span>
                        Move-in:{" "}
                        <strong className="font-mono text-slate-200">
                          {item.moveInDate}
                        </strong>
                      </span>
                    </div>

                    {/* Notes if available */}
                    {item.additionalNotes && (
                      <div className="flex items-start gap-2 text-xs bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60 text-slate-400 mt-3">
                        <FileText className="size-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <p className="italic line-clamp-2">
                          {item.additionalNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Badges & Action Buttons */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-2">
                    {/* Booking Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        item.bookingStatus === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : item.bookingStatus === "Rejected"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      <Clock className="size-3" />
                      {item.bookingStatus}
                    </span>

                    {/* Payment Status Badge */}
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider border ${
                        item.paymentStatus?.toLowerCase() === "paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </div>

                  {/* Actions */}
                  <div>
                    {isPending ? (
                      <div className="flex items-center gap-1.5">
                        <Button
                          isIconOnly
                          size="sm"
                          isDisabled={isProcessing}
                          onPress={() =>
                            handleStatusUpdate(item._id, "Approved")
                          }
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl size-8 min-w-0"
                          title="Approve"
                        >
                          {isProcessing ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Check className="size-4" />
                          )}
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          isDisabled={isProcessing}
                          onPress={() =>
                            handleStatusUpdate(item._id, "Rejected")
                          }
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl size-8 min-w-0"
                          title="Reject"
                        >
                          {isProcessing ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <X className="size-4" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono italic">
                        Done
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OwnerBookingTable;
