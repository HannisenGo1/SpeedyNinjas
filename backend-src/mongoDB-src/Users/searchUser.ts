import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { Response } from "express";
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument> 


export async function searchUser(searchString: string, res: Response): Promise<WithId<User>[] > {
    try {
        x = await connectToDatabase<UserDocument>("users")
        
        const searchterm = searchString.split(" ").map(term => term.trim()).filter(term => term.length > 0)
        const userQueries = searchterm.map(term => ({
            name: {$regex: new RegExp(term, "i")}
        }))
        
        const users = await x.collection
        .find({ $or: userQueries}).toArray()
        
        return users;
        
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    } finally {
        if(x) {
            await x.client.close()

        }
    }
   
}