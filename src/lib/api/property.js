import { protectedFetch, serverFetch } from "../core/server"




export const getProperty = async(query) =>{
    return serverFetch(`/properties?${query.toString()}`)
};
export const getAllProperty = async() =>{
    return protectedFetch(`/allProperties`)
};

export const getFeaturedProperty = async() =>{
    return serverFetch(`/featuredProperty`)
};

export const getPropertyById = async(propertyId) =>{
    return protectedFetch(`/properties/${propertyId}`)
}

export const getPropertyByOwnerId = async (ownerId) => {
  return protectedFetch(`/my/properties?ownerId=${ownerId}`);
};
