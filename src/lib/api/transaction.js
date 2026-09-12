import { protectedFetch } from "../core/server"


export const getAllTransactions = async () =>{
    return protectedFetch("/transactions")
}