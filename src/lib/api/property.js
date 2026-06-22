import { serverFetch } from "../core/server"


export const getProperty = async(query) =>{
    return serverFetch(`/properties?${query.toString()}`)
};

export const getPropertyById = async(propertyId) =>{
    return serverFetch(`/properties/${propertyId}`)
}

export const getPropertyByOwnerId = async (ownerId) => {
  return serverFetch(`/my/properties?ownerId=${ownerId}`);
};
