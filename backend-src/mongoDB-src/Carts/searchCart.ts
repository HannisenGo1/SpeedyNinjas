import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js";
import { con } from "../../server.js";
import { Response } from "express";

export async function searchCart(searchString: string, res: Response): Promise<WithId<Cart>[] > {
    if (!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!");
    }
    const client: MongoClient = new MongoClient(con);
    try {
        const db: Db = await client.db("flowerProduct");
        const collection: Collection<Cart> = db.collection<Cart>("carts");
        
        const Carts = await collection
        .find({
            name: { $regex: new RegExp(searchString), $options: "i" },
        })
        .toArray();
   
        return Carts;
    } catch (error) {
        console.error('Error fetching carts', error);
        throw error;
    } finally {
        await client.close();
    }
   
}
