"use server";

import { authHeader } from "../core/server";

export const createReview = async (reviewData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(reviewData),
  });

  return res.json();
};