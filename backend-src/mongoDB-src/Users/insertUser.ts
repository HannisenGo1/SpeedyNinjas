import { Collection, Db, InsertOneResult, MongoClient, ObjectId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { con } from "../../server.js";



export async function insertUser(user: User) : Promise<ObjectId | null>{
    
    
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    try {
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <User> = db.collection<User>('users')
    
        const result: InsertOneResult<User> = await collection.insertOne(user)
    
        return result.insertedId

    }catch (error) {
        console.error('Error fetching Users', error);
        throw error;
    }finally {
        await client.close()

    }
}