import { Collection, ObjectId, InsertOneResult, MongoClient, Db, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { con } from "../../server.js"; 


export async function insertFlower(flower: Flower) : Promise<ObjectId | null>{
    
  
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    const db : Db = await client.db("flowerProduct")
    const collection: Collection <Flower> = db.collection<Flower>('flowers')
        
    const result: InsertOneResult<Flower> = await collection.insertOne(flower)

    return result.insertedId
}