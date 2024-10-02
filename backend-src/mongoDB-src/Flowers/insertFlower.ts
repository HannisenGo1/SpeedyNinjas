import { Collection, ObjectId, InsertOneResult, MongoClient, Db, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";


type FlowerDocument = Flower & Document; 
let x: ClientType<FlowerDocument> 

export async function insertFlower(flower: Flower) : Promise<ObjectId | null>{
    
    try {
        // const db : Db = await client.db("flowerProduct")
        // const collection: Collection <Flower> = db.collection<Flower>('flowers')
        x = await connectToDatabase<FlowerDocument>("flowers")
            
        const result: InsertOneResult<Flower> = await x.collection.insertOne(flower as FlowerDocument)
        return result.insertedId
        
    }catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }


    }
}