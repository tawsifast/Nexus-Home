import { serverMutation } from "../core/server"

export const createProperty = async(newPropertyData) =>{
    return serverMutation("/properties", newPropertyData)
}