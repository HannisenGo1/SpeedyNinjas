import { Collection, Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";


type FlowerDocument = Flower & Document; 
let x: ClientType<FlowerDocument> 

export async function updateFlower(index: ObjectId, body: Object) {
    
    try {
    
        const filter = {_id: index}
        x = await connectToDatabase<FlowerDocument>("flowers")
        const result: UpdateResult<Flower>  = await x.collection.updateOne(filter, {$set: body })
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
            
        } 
        console.log(`deleted: ${result.upsertedCount}`);
        return result
        
    }catch (error) {
        console.error('Error updating flowers', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }

    }


}