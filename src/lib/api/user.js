import { headers } from "next/headers";
import { auth } from "../auth";


// user pawar jonno api lagbe na better auth kore dibe
// export const getAllUserList = async () => {
//   const users = await auth.api.listUsers({
//     query: {
//       sortBy: "createdAt",
//       sortDirection: "desc",
//     },
//     // This endpoint requires session cookies.
//     headers: await headers(),
//   });
//   return users;
// };

import { protectedFetch } from "../core/server";

export const getAllUserList = async () => {
  return protectedFetch("/users");
};