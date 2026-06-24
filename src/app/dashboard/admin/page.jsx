import { getAllBookings } from "@/lib/api/booking";
import { getAllProperty } from "@/lib/api/property";
import { getAllUserList } from "@/lib/api/user";
import React from "react";
import {
  Building2,
  Users2,
  CalendarCheck2,
  DollarSign,
  ShieldAlert,
} from "lucide-react";

const AdminDashboard = async () => {
  // সেফলি সার্ভার এপিআই থেকে ডেটা ফেচ করা হচ্ছে
  const allBookings = (await getAllBookings()) || [];
  const properties = (await getAllProperty()) || [];
  const userData = await getAllUserList();
  const users = userData?.users || [];

  // ১. স্ট্যাটিস্টিক্স হিসাব-নিকাশ
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </div>
              <CalendarCheck2 className="size-4.5 text-purple-400 block" />
              <h2 className="text-sm md:text-base font-extrabold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                Recent Booking Dispatches
              </h2>
            </div>
            <span className="w-fit text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold px-2.5 py-1 rounded-md font-mono tracking-wider">
              LIVE_STREAM // {recentBookings.length} LOG_ENTRIES
            </span>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto rounded-xl border border-white/[0.03]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#131424] text-slate-300 border-b border-white/5 font-mono font-bold tracking-wider">
                  <th className="p-4 uppercase">Property</th>
                  <th className="p-4 uppercase">Tenant Address</th>
                  <th className="p-4 uppercase">Move-In Point</th>
                  <th className="p-4 uppercase">Price Rate</th>
                  <th className="p-4 text-center uppercase">Payment</th>
                  <th className="p-4 text-right uppercase">Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] bg-[#0c0c14]/20">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr
                      key={booking._id?.$oid || booking._id}
                      className="hover:bg-white/[0.03] bg-white/[0.01] transition-colors"
                    >
                      {/* FIXED: Property Title Highlighted */}
                      <td className="p-4 max-w-[180px] truncate">
                        <span className="block font-bold text-sm text-white tracking-wide">
                          {booking.title}
                        </span>
                        <span className="block text-[10px] font-medium text-purple-400 font-mono mt-0.5 uppercase">
                          {booking.location}
                        </span>
                      </td>
                      {/* FIXED: Tenant Info Highlighted */}
                      <td className="p-4">
                        <div className="font-bold text-sm text-slate-100 tracking-wide">
                          {booking.userName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {booking.userEmail}
                        </div>
                      </td>
                      {/* Move In Date */}
                      <td className="p-4 font-mono font-semibold text-slate-300">
                        {booking.moveInDate}
                      </td>
                      {/* FIXED: Price Highlighted with Cyan */}
                      <td className="p-4 font-mono font-black text-sm text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                        ${booking.price}
                      </td>
                      {/* Payment Badge Status */}
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono tracking-wider ${
                            booking.paymentStatus?.toLowerCase() === "paid"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {booking.paymentStatus || "unpaid"}
                        </span>
                      </td>
                      {/* Booking Status Badge */}
                      <td className="p-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                            booking.bookingStatus === "Approved"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : booking.bookingStatus === "Rejected"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                                : "bg-slate-800 text-slate-300 border border-slate-700"
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
