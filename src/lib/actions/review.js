

export const createReview = async (reviewData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  return res.json();
};

