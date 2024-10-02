import { Collection, Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { User } from "../../Interfaces/user.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument> 

export async function updateUser(index: ObjectId, body: Object) {
    try {
        x = await connectToDatabase<UserDocument>("users")
        const filter = {_id: index}
    
        const result: UpdateResult<User>  = await x.collection.updateOne(filter, {$set: body })
        if (!result.acknowledged) {
            console.log("Did not find a matching document");
            return
        } 
        console.log(`deleted: ${result.upsertedCount}`);
        return result
    }catch (error) {
        console.error('Error fetching Users', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }
    }


}