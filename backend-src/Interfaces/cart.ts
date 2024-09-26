import { ObjectId } from "mongodb";


export interface Cart{
    userId?: ObjectId;
    productId?: ObjectId;
    amount: number;
}