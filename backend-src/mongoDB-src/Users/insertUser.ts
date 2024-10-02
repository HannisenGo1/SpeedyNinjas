import { Collection, Db, InsertOneResult, MongoClient, ObjectId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument>

export async function insertUser(user: User) : Promise<ObjectId | null>{
    
    
    try {
        x = await connectToDatabase<UserDocument>("users")
    
        const result: InsertOneResult<User> = await x.collection.insertOne(user as UserDocument)
    
        return result.insertedId

    }catch (error) {
        console.error('Error fetching Users', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }
    }
}