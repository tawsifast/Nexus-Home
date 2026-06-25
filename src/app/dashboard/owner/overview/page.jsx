import { getOwnerBookingProperty } from '@/lib/actions/ownerBooking';
import { getPropertyByOwnerId } from '@/lib/api/property';
import { getUserSession } from '@/lib/core/session';
import { DollarSign, Home, Calendar } from 'lucide-react';
import OwnerEarningsChart from './OwnerEarningsChart';


const FetchOwnerAnalyticsData = async () => {
  // ১. সেশন এবং ডাটা লোড করা
  const user = await getUserSession();
  const ownerEmail = user?.email || "";
  const ownerId = user?.id || "";

  const properties = (await getPropertyByOwnerId(ownerId)) || [];
  const bookingList = (await getOwnerBookingProperty(ownerEmail)) || [];

  // ২. কার্ডের সাধারণ হিসাবসমূহ
  const totalEarnings = bookingList
    .filter((booking) => booking.paymentStatus === "paid")
    .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0);

  const totalProperties = properties.length;

  const totalBookings = bookingList.filter(
    (booking) => booking.bookingStatus === "Approved"
  ).length;

  // ৩. চার্টের জন্য গত ১২ মাসের ডাটা স্ট্রাকচার তৈরি (বাংলায় লজিক নিচে ব্যাখ্যা করা আছে)
  const generateLast12MonthsData = () => {
    const monthsData = [];
    // বর্তমান সময় ২০২৬ সাল থেকে হিসাব শুরু হবে
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthLabel = d.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      // কী তৈরি করছি (যেমন: "Jun 26") যা দিয়ে বুকিং ম্যাচ করানো যাবে
      const yearMonthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

      monthsData.push({
        month: monthLabel,
        key: yearMonthKey,
        earnings: 0
      });
    }
    return monthsData;
  };

  const chartDataStructure = generateLast12MonthsData();

  // ৪. সফল বুকিং পেমেন্টগুলো নির্দিষ্ট মাসের বক্সে যোগ করা
  bookingList.forEach((booking) => {
    if (booking.paymentStatus === "paid" && booking.bookedAt) {
      const bookingDate = new Date(booking.bookedAt);
      const bookingKey = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, '0')}`;
      
      const targetMonth = chartDataStructure.find(m => m.key === bookingKey);
      if (targetMonth) {
        targetMonth.earnings += (Number(booking.price) || 0);
      }
    }
  });

  return (
    <div className="space-y-8 p-4 md:p-8 min-h-screen bg-[#030307]">
      {/* ৩টি সামারি কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl transition-all hover:border-purple-500/30 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Earnings</p>
              <h3 className="text-3xl font-extrabold text-white">${totalEarnings.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <DollarSign className="size-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">Sum of all successful booking payments received.</p>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl transition-all hover:border-cyan-500/30 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Properties</p>
              <h3 className="text-3xl font-extrabold text-white">{totalProperties}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Home className="size-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">Number of premium assets created by your profile.</p>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden border border-white/5 bg-[#0c0c14]/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl transition-all hover:border-emerald-500/30 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</p>
              <h3 className="text-3xl font-extrabold text-white">{totalBookings}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calendar className="size-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">Number of confirmed bookings across your directory.</p>
        </div>
      </div>

      {/* ১২ মাসের ইনকামের লাইন চার্ট সেকশন */}
      <div className="w-full">
        <OwnerEarningsChart chartData={chartDataStructure} />
      </div>
    </div>
  );
};

export default FetchOwnerAnalyticsData;