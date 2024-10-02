import { MongoClient, Db, Collection, Document } from "mongodb"
import { Flower } from "../Interfaces/product.js";

export const con: string | undefined = process.env.CONNECTION_STRING

export async function connectToDatabase<T extends Document>(dataPointer : string): Promise<Collection<T>>{
    
    if(!con){
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    try {
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <T> = db.collection<T>(dataPointer)
        return collection

    }catch (error) {
        console.error("Failed to connect to the database or retrieve collection", error);
        throw new Error("Database connection or query failed");

    } 
    // finally {
    //     await client.close()

    // }
    




}