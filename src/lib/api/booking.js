
export const createBooking = async (bookingData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...bookingData,
      paymentStatus: "Unpaid",
      bookingStatus: "Pending",
    }),
  });

  return res.json();
};

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
