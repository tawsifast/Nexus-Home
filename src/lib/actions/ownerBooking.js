"use server";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";


export const getOwnerBookingProperty = async(ownerEmail)=>{
    return protectedFetch(`/owner/bookings?ownerEmail=${ownerEmail}`)
}

export const updateBooking = async(id, data)=>{
    return serverMutation(`/owner/bookings/${id}`, data, "PATCH")
}