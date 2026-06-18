"use client";

import React, { useState } from "react";
import { Heart, Calendar, Phone, FileText, User, MessageSquare, ShieldCheck, Zap } from "lucide-react";
// আপনার দেওয়া HeroUI v3 এর এক্সাক্ট ফর্ম ও মোডাল আর্কিটেকচার ইমপোর্ট
import { Modal, Button, TextField, Label, Input } from "@heroui/react"; 
import { useRouter } from "next/navigation";

export default function PropertyActionBlock({ property }) {
  const router = useRouter();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // বুকিং ফর্ম স্টেট
  const [moveInDate, setMoveInDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddToFavorite = async () => {
    setLoadingFav(true);
    try {
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFav(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault(); // ফর্ম রিলোড আটকানোর জন্য

    if (!moveInDate || !contactNumber) {
      alert("Please fill in the required fields.");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        propertyId: property._id,
        title: property.title,
        image: property.image,
        location: property.location,
        price: property.price,
        moveInDate,
        contactNumber,
        additionalNotes: notes,
        status: "Pending", // পেমেন্ট না হওয়া পর্যন্ত পেন্ডিং থাকবে
        bookedAt: new Date().toISOString()
      };

      // মঙ্গোডিবি-তে ডেটা সেভ করার জন্য এক্সপ্রেস এপিআই রুট হিট করতে পারেন (যেমন: /api/bookings)
      console.log("Saving to MongoDB -> Showing in My Bookings Route Later:", bookingData);
      
      // লোকাল স্টোরেজে ব্যাকআপ সেভ করে টেস্ট করার সুবিধার্থে (পরবর্তীতে রিয়েল এপিআই দিয়ে রিপ্লেস করবেন)
      const existingBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
      localStorage.setItem("myBookings", JSON.stringify([...existingBookings, bookingData]));

      // বুকিং সফল হলে সরাসরি পেমেন্ট গেটওয়েতে পাঠিয়ে দেওয়া
      router.push(`/all-client/payment?propertyId=${property._id}&amount=${property.price}`);
    } catch (error) {
      console.error(error);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] p-6 rounded-3xl space-y-6 text-left sticky top-28 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      
      {/* 1. Price Container */}
      <div className="space-y-1">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Rent Investment</p>
        <div className="text-3xl font-black text-white flex items-baseline gap-1">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            ৳{property.price?.toLocaleString("en-BD")}
          </span>
          <span className="text-xs text-slate-400 font-normal">
            /{property.rentType === "Daily" ? "day" : "month"}
          </span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/[0.05]" />

      {/* 2. Owner Profile Metadata */}
      <div className="space-y-3">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Listed By</p>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04]">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <User size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200">{property.ownerName || "Premium Landlord"}</h4>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MessageSquare size={12} className="text-purple-400" /> Responses within 1 hour
            </p>
          </div>
        </div>
      </div>

      {/* 3. Protection Indicators */}
      <div className="space-y-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] text-xs text-slate-400 font-light">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
          <span>Verified Owner Documentations</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-amber-400 shrink-0" />
          <span>Instant Rent Guarantee Slot</span>
        </div>
      </div>

      {/* 4. Interactive Triggers (Your Exact Modal Layout System) */}
      <div className="space-y-3 pt-2">
        
        {/* 📥 HeroUI Standardized Dot-Syntax Modal Integration */}
        <Modal>
          {/* Main Book Trigger */}
          <Button className="w-full h-12 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm rounded-xl tracking-wide shadow-lg shadow-cyan-500/10 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2">
            ⚡ Book Property Now
          </Button>
          
          <Modal.Backdrop className="backdrop-blur-md bg-black/60">
            <Modal.Container placement="center" className="max-w-md mx-4">
              <Modal.Dialog className="bg-[#111622] border border-white/[0.06] text-white rounded-3xl p-6 shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
                <Modal.CloseTrigger className="text-slate-400 hover:text-white transition-colors" />
                
                <Modal.Header className="border-b border-white/[0.05] pb-4 text-left">
                  <Modal.Heading className="text-xl font-extrabold text-white tracking-tight">Confirm Booking</Modal.Heading>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Provide credentials to secure your tenancy placement. Once confirmed, you can track it under <span className="text-cyan-400 font-semibold">My Bookings</span>.
                  </p>
                </Modal.Header>

                <Modal.Body className="py-4 text-left">
                  <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                    
                    {/* Move-in Date */}
                    <TextField className="w-full space-y-1" name="moveInDate" variant="secondary">
                      <Label className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <Calendar size={13} className="text-cyan-400" /> Move-in Date *
                      </Label>
                      <Input 
                        type="date" 
                        required 
                        className="bg-white/[0.01] border border-white/[0.08] rounded-xl text-white focus:border-cyan-500 w-full"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                      />
                    </TextField>

                    {/* Contact Phone */}
                    <TextField className="w-full space-y-1" name="phone" variant="secondary">
                      <Label className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <Phone size={13} className="text-cyan-400" /> Contact Number *
                      </Label>
                      <Input 
                        type="tel" 
                        placeholder="+880 1XXX XXXXXX" 
                        required 
                        className="bg-white/[0.01] border border-white/[0.08] rounded-xl text-white focus:border-cyan-500 w-full"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </TextField>

                    {/* Specifications Notes */}
                    <TextField className="w-full space-y-1" name="message" variant="secondary">
                      <Label className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        <FileText size={13} className="text-purple-400" /> Additional Notes
                      </Label>
                      <Input 
                        placeholder="Any timing constraints, rules or preferences..." 
                        className="bg-white/[0.01] border border-white/[0.08] rounded-xl text-white focus:border-cyan-500 w-full"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </TextField>

                    {/* Dialog Footers inside Form for Submission Scope */}
                    <div className="border-t border-white/[0.05] pt-4 flex items-center justify-end gap-3 mt-2">
                      <Button slot="close" variant="secondary" className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 font-medium rounded-xl text-xs cursor-pointer">
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={bookingLoading}
                        className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl text-xs hover:opacity-90 transition-all cursor-pointer"
                      >
                        {bookingLoading ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    </div>

                  </form>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>

        {/* Favorite Trigger */}
        <button
          disabled={loadingFav}
          onClick={handleAddToFavorite}
          className={`w-full h-11 border text-xs font-semibold rounded-xl tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isFavorite 
              ? "bg-pink-500/10 border-pink-500/40 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]" 
              : "bg-white/[0.01] border-white/[0.06] text-slate-300 hover:border-pink-500/30 hover:text-pink-400"
          }`}
        >
          <Heart size={14} className={isFavorite ? "fill-pink-500 stroke-pink-500" : "stroke-slate-400"} />
          {isFavorite ? "Saved in Favorites" : "Add to Favorites"}
        </button>

      </div>
    </div>
  );
}