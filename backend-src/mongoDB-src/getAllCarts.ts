import { MongoClient, Db, Collection, FindCursor, WithId } from "mongodb";
import { Carts } from "../Interfaces/cart.js";

export async function getAllCarts() {

    const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        return
    }
    try {
        const client: MongoClient = new MongoClient(con)
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <Carts> = db.collection<Carts>('carts')

    
        const cursor: FindCursor <WithId<Carts>> = collection.find({})
        const found: WithId<Carts>[] = await cursor.toArray()
        
        if(found.length < 1) {
            console.log( "No products in cart today :/");
            return
        }
        found.forEach(cart => {
            console.log(cart.amount);
            
        });
        
    }catch(error) {
        console.log("Failed ", error);
        
    }
}