import { serverFetch } from "../core/server"

export const getProperty = async() =>{
    return serverFetch("/properties")
};

export const getPropertyById = async(propertyId) =>{
    return serverFetch(`/properties/${propertyId}`)
}

export const getPropertyByOwnerId = async (ownerId) => {
  return serverFetch(`/my/properties?ownerId=${ownerId}`);
};
