"use server"



import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


// export const updateUsersRole = async (userId, role) =>{
//     const data = await auth.api.setRole({
//         body:{
//             userId: userId,
//             role: role
//         },
//         headers: await headers()
//     });
//     revalidatePath("/dashboard/admin/all-users")
//     return data
// }

export const updateUsersRole = async (userId, role) => {
  const res = await serverMutation(`/users/${userId}`, { role }, "PATCH");
  revalidatePath("/dashboard/admin/all-users");
  return res;
};