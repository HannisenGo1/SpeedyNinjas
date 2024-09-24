import { Collection, ObjectId, InsertOneResult, MongoClient, Db } from "mongodb";
import { Flower } from "../Interfaces/product.js";
import { con } from '../server.js'


export async function insertFlower(flower: Flower) : Promise<ObjectId | null>{
    
    // const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    const db : Db = await client.db("flowerProduct")
    const col: Collection <Flower> = db.collection<Flower>('flowers')

    const result: InsertOneResult<Flower> = await col.insertOne(flower)
    if (!result.acknowledged){
        console.log('Could not insert flower.')
        return null
    }
    return result.insertedId
}