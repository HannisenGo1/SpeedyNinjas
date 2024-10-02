import { Collection, Db, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { con } from '../../server.js'
import { connectToDatabase } from "../connection.js";

export async function deleteUser(index: ObjectId) {
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    
    const client: MongoClient = new MongoClient(con)
    try {

        const collection: Collection<User> = await connectToDatabase<User>("users")
        const filter = {_id: index}
        const result: DeleteResult = await collection.deleteOne(filter)
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
            
        } 
        console.log(`deleted: ${result.deletedCount}`);

    }catch (error) {
        console.error('Error fetching Users', error);
        throw error;
    }finally {
        await client.close()

    }
    
}