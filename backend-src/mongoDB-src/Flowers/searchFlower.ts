import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js";
import { con } from "../../server.js";
import { connectToDatabase } from "../connection.js";

export async function searchFlower(searchString: string): Promise<WithId<Flower>[] > {
    if (!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!");
    }
    const client: MongoClient = new MongoClient(con);
    try {
        // const db: Db = await client.db("flowerProduct");
        // const collection: Collection<Flower> = db.collection<Flower>("flowers");
        const collection: Collection<Flower> = await connectToDatabase<Flower>("flowers")
        const searchterm = searchString.split(" ").map(term => term.trim()).filter(term => term.length > 0)
        const flowerQueries = searchterm.map(term => ({
            name: {$regex: new RegExp(term, "i")}
        }))
        
        const flowers = await collection
        .find({ $or: flowerQueries}).toArray()
        
        return flowers;
        
    } catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    } finally {
        await client.close();
    }
   
}
