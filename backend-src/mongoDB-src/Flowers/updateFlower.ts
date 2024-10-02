import { Collection, Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { con } from "../../server.js"; 
import { connectToDatabase } from "../connection.js";

export async function updateFlower(index: ObjectId, body: Object) {
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    try {
    
        // const db : Db = await client.db("flowerProduct")
        // const collection: Collection <Flower> = db.collection<Flower>('flowers')
        const filter = {_id: index}
        const collection: Collection<Flower> = await connectToDatabase<Flower>("flowers")
        const result: UpdateResult<Flower>  = await collection.updateOne(filter, {$set: body })
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
        await client.close()

    }
}