import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { con } from "../../server.js";
import { Response } from "express";
import { connectToDatabase } from "../connection.js";

export async function searchUser(searchString: string, res: Response): Promise<WithId<User>[] > {
    if (!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!");
    }
    const client: MongoClient = new MongoClient(con);
    try {
        const collection: Collection<User> = await connectToDatabase<User>("users")
        
        const searchterm = searchString.split(" ").map(term => term.trim()).filter(term => term.length > 0)
        const userQueries = searchterm.map(term => ({
            name: {$regex: new RegExp(term, "i")}
        }))
        
        const users = await collection
        .find({ $or: userQueries}).toArray()
        
        return users;
        
    } catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    } finally {
        await client.close();
    }
   
}