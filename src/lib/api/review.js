export const getReviews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export const getPropertyReviews = async (propertyId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${propertyId}`,
    { cache: "no-store" }
  );
  return res.json();
};

export const getHomeReviews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-reviews`, {
    cache: "no-store",
  });
  return res.json();
};