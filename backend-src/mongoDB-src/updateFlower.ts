import { Collection, Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { Flower } from "../Interfaces/product.js";
import { con } from '../server.js'

export async function updateFlower(index: ObjectId, body: Object) {
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    
    const client: MongoClient = new MongoClient(con)

    const db : Db = await client.db("flowerProduct")
    const collection: Collection <Flower> = db.collection<Flower>('flowers')
    const filter = {_id: index}

    const result: UpdateResult<Flower>  = await collection.updateOne(filter, {$set: body })
    if (!result.acknowledged) {
        console.log("Did not find a matching dokument");
        return
        
    } 
    console.log(`deleted: ${result.upsertedCount}`);
    
}

