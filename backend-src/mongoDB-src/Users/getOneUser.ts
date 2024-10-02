import { Collection, Db, FindCursor, MongoClient, ObjectId, WithId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { con } from "../../server.js";


export async function getOneUser(id: ObjectId): Promise<WithId<User>[]> {

    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
        const client: MongoClient = new MongoClient(con)
        try {

            const db : Db = await client.db("flowerProduct")
            const collection: Collection <User> = db.collection<User>('users')
    
            const filter = {_id: id}
            const cursor: FindCursor <WithId<User>> = collection.find(filter)
            const found: WithId<User>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No User awailable today :/");
            
            }
            
            return found

        }catch (error) {
            console.error('Error fetching Users', error);
            throw error;
        }finally {
            await client.close()
    
        }
}