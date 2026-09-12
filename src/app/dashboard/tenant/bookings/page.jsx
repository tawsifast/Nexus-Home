import React from 'react';
import BookingTable from './BookingTable';
import { getUserSession } from '@/lib/core/session';
import { getBookingByBuyer } from '@/lib/api/booking';
import { ClipboardList, CalendarDays } from 'lucide-react';

const BookingPage = async () => {
  const user = await getUserSession();
  const bookings = await getBookingByBuyer(user?.email);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-4 sm:p-8 antialiased relative overflow-hidden">

      {/* Page-Wide Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Obsidian Glass Header Hero Card */}
        <div className="relative overflow-hidden bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/20">

          {/* Card Ambient Lighting */}
          <div className="absolute -top-24 -left-24 size-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 size-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Left Header Title & Info */}
            <div className="flex items-center gap-4">

              {/* Cobalt Glass Badge */}
              <div className="p-3 bg-cyan-950/50 text-cyan-400 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] shrink-0">
                <ClipboardList className="size-6" />
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    My Bookings
                  </h1>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase tracking-wider bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 rounded-md">
                    Booking Registry
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">
                  Review and track your property reservation updates
                </p>
              </div>

            </div>

            {/* Right Total Bookings Counter Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl shrink-0 self-start sm:self-center shadow-inner">
              <CalendarDays className="size-4 text-cyan-400" />
              <span className="text-xs text-slate-400 font-medium">Total Bookings:</span>
              <span className="text-sm font-black font-mono text-cyan-400">
                {bookings?.length ?? 0}
              </span>
            </div>

          </div>
        </div>

        {/* Render Refined Obsidian Booking Table */}
        <BookingTable initialBookings={bookings} />

      </div>
    </div>
  );
};

export default BookingPage;