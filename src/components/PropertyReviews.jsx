"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { getPropertyReviews } from "@/lib/api/review";
import { createReview } from "@/lib/actions/review";
import { Star, MessageSquare, Calendar, User, ShieldAlert } from "lucide-react";

export default function PropertyReviews({
  initialReviews = [],
  propertyId,
  user,
  allBookings = []
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const hasApprovedBooking = Array.isArray(allBookings) && allBookings.some((booking) => {
    const emailMatches = booking?.userEmail?.toLowerCase().trim() === user?.email?.toLowerCase().trim();
    
    const propertyIdMatches = booking?.propertyId?.toString().trim() === propertyId?.toString().trim();
    
    const isApproved = booking?.bookingStatus?.toLowerCase().trim() === "approved";

    return emailMatches && propertyIdMatches && isApproved;
  });

  const isEligibleToReview = user && user?.role?.toLowerCase() === "tenant" && hasApprovedBooking;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);

    const reviewData = {
      propertyId,
      userName: user.name, 
      userEmail: user.email,
      userImage: user.image || "",
      rating: rating,
      comment: comment,
    };

    try {
      await createReview(reviewData);
      
      // ডাটাবেজ থেকে রিয়েল-টাইম আপডেটেড রিভিউ লিস্ট রি-ফেচ
      const updatedReviews = await getPropertyReviews(propertyId);
      setReviews(updatedReviews);
      
      // ফর্ম রিসেট
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Review submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 mt-12 border-t border-white/[0.06] pt-10">
      {/* হেডার */}
      <div className="flex items-center gap-2">
        <MessageSquare className="text-cyan-400 size-5" />
        <h3 className="text-xl font-bold text-white tracking-wide">
          Tenant Feedback ({reviews.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* বাম কলাম: রিভিউ লিস্ট */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl space-y-3 hover:border-white/[0.08] transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    {review.userImage ? (
                      <img src={review.userImage} alt={review.userName} className="size-9 rounded-full object-cover border border-purple-500/30" />
                    ) : (
                      <div className="size-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <User size={16} />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">
                        {review.userName || "Anonymous Tenant"}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {review.userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Calendar size={12} />
                    <span>
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                </div>

                {/* স্টার রেট রেন্ডারিং */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? "fill-cyan-400 text-cyan-400" : "text-slate-700"}
                    />
                  ))}
                </div>

                <p className="text-sm text-slate-400 font-light leading-relaxed pl-1">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 border border-dashed border-white/5 rounded-2xl text-center text-slate-500 text-sm font-mono">
               NO REVIEWS TRANSMITTED YET
            </div>
          )}
        </div>

        {/* ডান কলাম: রিভিউ ফর্ম অথবা রেস্ট্রিকশন নোটিশ */}
        <div className="lg:col-span-1">
          {isEligibleToReview ? (
            <form
              onSubmit={handleSubmitReview}
              className="backdrop-blur-xl bg-[#111222]/40 border border-white/5 p-5 rounded-2xl space-y-4 shadow-xl"
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400">
                Write a Review
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Your Rating</label>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform active:scale-95"
                      >
                        <Star
                          size={20}
                          className={`transition-colors cursor-pointer ${
                            starValue <= (hoverRating || rating)
                              ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                              : "text-slate-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Review Message</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your live-in experience..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] h-10"
              >
                Submit Review
              </Button>
            </form>
          ) : (
            <div className="backdrop-blur-xl bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl text-center space-y-3">
              <ShieldAlert className="mx-auto text-amber-500/60 size-5" />
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {!user 
                  ? "Please log in to your Tenant account to submit review telemetry."
                  : user.role?.toLowerCase() !== "tenant"
                  ? "Access Denied. Only registered Tenants can submit reviews."
                  : "Review locked. You can only review properties where you have an 'Approved' booking dispatch."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}