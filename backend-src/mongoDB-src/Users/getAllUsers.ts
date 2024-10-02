import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { User } from "../../Interfaces/user.js"; 
import { con } from "../../server.js"; 
import { connectToDatabase } from "../connection.js";

export async function getAllUsers(): Promise<WithId<User>[]> {

    // const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
        const client: MongoClient = new MongoClient(con)
        try {

            const collection: Collection<User> = await connectToDatabase<User>("users")
    
            const cursor: FindCursor <WithId<User>> = collection.find({})
            const found: WithId<User>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No products in User today :/");
            }
        return found

        }catch (error) {
            console.error('Error fetching Users', error);
            throw error;
        }finally {
            await client.close()
    
        }
}