import React from 'react';
import { getAllBookings } from '@/lib/api/booking';
import AdminBookingTable from './AdminBookingTable';


const AllBookingPage = async () => {
    // Fetch bookings directly on the server side
    const allBookings = await getAllBookings() || [];
    
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
                    Booking Management Matrix
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                    System Node // Administrative Global Overview
                </p>
            </div>
            
            <AdminBookingTable initialBookings={allBookings} />
        </div>
    );
};

export default AllBookingPage;