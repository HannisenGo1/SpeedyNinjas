import { Collection, ObjectId, InsertOneResult, MongoClient, Db, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { con } from "../../server.js"; 


export async function insertFlower(flower: Flower) : Promise<ObjectId | null>{
    
    // const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    const db : Db = await client.db("flowerProduct")
    const collection: Collection <Flower> = db.collection<Flower>('flowers')

    // const newFlower: Flower = {
    //     name: "Dandilion",
    //     price: 66.45,
    //     image:"https://example.com/lavender.jpg",
    //     amountInStock: 100
    
    // }

    const result: InsertOneResult<Flower> = await collection.insertOne(flower)
    console.log(result)
    if (!result.acknowledged){
        console.log('Could not insert flower.')
        return null
    }
    return result.insertedId
}