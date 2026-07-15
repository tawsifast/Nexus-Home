import React from 'react';
import BookingTable from './BookingTable';
import { getUserSession } from '@/lib/core/session';
import { getBookingByBuyer } from '@/lib/api/booking';
import { ClipboardList } from 'lucide-react';

const BookingPage = async () => {
     const user = await getUserSession()
    const bookings = await getBookingByBuyer(user?.email);
    
    return (
        <div className="min-h-screen text-slate-100 p-6 sm:p-8 antialiased">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Section Header */}
                <div className="flex items-center gap-3 border-b border-white/5 pb-5">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/10">
                        <ClipboardList className="size-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">My Bookings</h1>
                        <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wider font-mono">
                            Review and track your property reservation updates
                        </p>
                    </div>
                </div>

                {/* Render the structural content matrix table */}
                <BookingTable initialBookings={bookings} />

            </div>
        </div>
    );
};

export default BookingPage;