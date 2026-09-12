import { protectedFetch, serverFetch } from "../core/server";


export const getAllBookings = async() => {
    return protectedFetch("/allbookings")
}

export const getBookingByBuyer = async(email) => {
    return protectedFetch(`/tenantBookings/${email}`)
}

export const createStripeSession = async (data) => {
  const res = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


