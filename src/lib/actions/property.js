"use server";

import { serverMutation, authHeader } from "../core/server"

export const createProperty = async(newPropertyData) =>{
    return serverMutation("/properties", newPropertyData)
}

export const updatedProperty = async (propertyId, updatedPropertyData) => {
  return serverMutation(`/my/properties/${propertyId}`, updatedPropertyData, "PATCH");
};

export const updatedPropertyByAdmin = async (propertyId, updatedPropertyData) => {
  return serverMutation(`/adminProperty/${propertyId}`, updatedPropertyData, "PATCH");
};

export const deleteProperty = async (propertyId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my/properties/${propertyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  return res.json();
};

export const deletePropertyByAdmin = async (selectedPropertyId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/allProperties/${selectedPropertyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  });
  return res.json();
}