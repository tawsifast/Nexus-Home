"use server";

import { authHeader } from "../core/server";

export const createBooking = async (bookingData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify({
      ...bookingData,
      paymentStatus: "unpaid",
      bookingStatus: "Pending",
    }),
  });

  const data = await res.json();
  return { ...data, status: res.status };
};