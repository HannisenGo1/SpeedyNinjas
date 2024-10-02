import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { User } from "../../Interfaces/user.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument> 


export async function getAllUsers(): Promise<WithId<User>[]> {

        try {

            x = await connectToDatabase<UserDocument>("users")
    
            const cursor: FindCursor <WithId<User>> = x.collection.find({})
            const found: WithId<User>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No products in User today :/");
            }
        return found

        }catch (error) {
            console.error('Error fetching Users', error);
            throw error;
        }finally {
            if(x) {
                await x.client.close()
    
            }
        }
}