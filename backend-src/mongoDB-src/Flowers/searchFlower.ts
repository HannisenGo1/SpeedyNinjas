import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js";
import { con } from "../../server.js";
import { Response } from "express";

export async function searchFlower(searchString: string, res: Response): Promise<WithId<Flower>[] > {
    if (!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!");
    }
    const client: MongoClient = new MongoClient(con);
    try {
        const db: Db = await client.db("flowerProduct");
        const collection: Collection<Flower> = db.collection<Flower>("flowers");
        
        const flowers = await collection
        .find({
            name: { $regex: new RegExp(searchString), $options: "i" },
        })
        .toArray();
        //   if (flowers.length === 0) {
        //      return  res.status(404)
        // }
        return flowers;
    } catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    } finally {
        await client.close();
    }
   
}
