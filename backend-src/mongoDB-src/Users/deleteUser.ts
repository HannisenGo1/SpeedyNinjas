import { Collection, Db, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { User } from "../../Interfaces/user.js";
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument> 

export async function deleteUser(index: ObjectId) {
 
    
    try {

        x = await connectToDatabase<UserDocument>("users")
        const filter = {_id: index}
        const result: DeleteResult = await x.collection.deleteOne(filter)
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
            
        } 
        console.log(`deleted: ${result.deletedCount}`);
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