import { getAllBookings } from "@/lib/api/booking";
import { getAllProperty } from "@/lib/api/property";
import { getAllUserList } from "@/lib/api/user";
import React from "react";
import {
  Building2,
  Users2,
  CalendarCheck2,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

const AdminDashboard = async () => {
  // সেফলি সার্ভার এপিআই থেকে ডেটা ফেচ করা হচ্ছে
  const allBookings = (await getAllBookings()) || [];
  const properties = (await getAllProperty()) || [];
  const userData = await getAllUserList();
  const users = userData?.users || [];

  // ১. স্ট্যাটিস্টিক্স হিসাব-নিকাশ (আপনার ডেটা স্ট্রাকচার অনুযায়ী)
  // শুধুমাত্র "paid" বুকিংগুলোর প্রাইজ সামেশন করে টোটাল রেভিনিউ বের করা হচ্ছে
  const totalRevenue = allBookings
    .filter((booking) => booking.paymentStatus?.toLowerCase() === "paid")
    .reduce((sum, booking) => sum + (booking.price || 0), 0);

  const pendingProperties = properties.filter(
    (p) => p.status === "Pending",
  ).length;
  const totalTenants = users.filter((u) => u.role === "tenant").length;

  // লেটেস্ট ৫টি বুকিং টেবিলে দেখানোর জন্য
  const recentBookings = allBookings.slice(0, 5);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-slate-100 p-4 md:p-8 relative overflow-hidden">
      {/* Background Cyber Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
              HQ//ADMIN_PANEL
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              System Node Operational Status // Verified Clearance
            </p>
          </div>
          <div className="text-right font-mono text-[11px] text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 rounded-lg px-3 py-1.5 shrink-0">
            SYSTEM TIME // 2026_GEN_Z
          </div>
        </div>

        {/* Grid 1: Analytics Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Revenue */}
          <div className="backdrop-blur-xl bg-[#111222]/40 border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Revenue
              </span>
              <h3 className="text-2xl font-black text-emerald-400 font-mono">
                ${totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <DollarSign className="size-5" />
            </div>
          </div>

          {/* Card 2: Total Properties */}
          <div className="backdrop-blur-xl bg-[#111222]/40 border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Listings
              </span>
              <h3 className="text-2xl font-black text-white font-mono">
                {properties.length}
              </h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
              <Building2 className="size-5" />
            </div>
          </div>

          {/* Card 3: System Users */}
          <div className="backdrop-blur-xl bg-[#111222]/40 border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Users
              </span>
              <h3 className="text-2xl font-black text-cyan-400 font-mono">
                {users.length}{" "}
                <span className="text-xs text-slate-500 font-normal">
                  ({totalTenants} Tenants)
                </span>
              </h3>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
              <Users2 className="size-5" />
            </div>
          </div>

          {/* Card 4: Action / Pending Approvals */}
          <div className="backdrop-blur-xl bg-[#111222]/40 border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Pending Verification
              </span>
              <h3 className="text-2xl font-black text-rose-400 font-mono">
                {pendingProperties}
              </h3>
            </div>
            <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400">
              <ShieldAlert className="size-5" />
            </div>
          </div>
        </div>

        {/* Grid 2: Recent Streaming Log Bookings Table */}
        <div className="backdrop-blur-xl bg-[#0c0c14]/60 border border-white/5 rounded-2xl p-5 md:p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="size-4 text-purple-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Recent Booking Dispatches
              </h2>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded font-mono">
              Showing Last {recentBookings.length} Log Entries
            </span>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto rounded-xl border border-white/[0.03]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#131424] text-slate-400 border-b border-white/5 font-mono">
                  <th className="p-4">Property</th>
                  <th className="p-4">Tenant Address</th>
                  <th className="p-4">Move-In Point</th>
                  <th className="p-4">Price Rate</th>
                  <th className="p-4 text-center">Payment</th>
                  <th className="p-4 text-right">Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] bg-[#0c0c14]/20">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr
                      key={booking._id?.$oid || booking._id}
                      className="hover:bg-white/[0.01] transition-colors"
                    >
                      {/* Property Title */}
                      <td className="p-4 font-semibold text-slate-200 max-w-[180px] truncate">
                        {booking.title}
                        <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                          {booking.location}
                        </span>
                      </td>
                      {/* Tenant Info */}
                      <td className="p-4">
                        <div className="font-medium text-slate-300">
                          {booking.userName}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {booking.userEmail}
                        </div>
                      </td>
                      {/* Move In Date */}
                      <td className="p-4 font-mono text-slate-400">
                        {booking.moveInDate}
                      </td>
                      {/* Price */}
                      <td className="p-4 font-mono font-bold text-slate-300">
                        ${booking.price}
                      </td>
                      {/* Payment Badge Status */}
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase font-mono tracking-tight ${
                            booking.paymentStatus?.toLowerCase() === "paid"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {booking.paymentStatus || "unpaid"}
                        </span>
                      </td>
                      {/* Booking Status Badge */}
                      <td className="p-4 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                            booking.bookingStatus === "Approved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20"
                              : booking.bookingStatus === "Rejected"
                                ? "bg-rose-500/10 text-rose-400 border border-rose-400/20"
                                : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {booking.bookingStatus || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-8 text-center text-slate-500 font-mono"
                    >
                       NO DATA STREAMS LOADED
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
