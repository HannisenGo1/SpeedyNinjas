import { Collection, Db, InsertOneResult, MongoClient, ObjectId } from 'mongodb';
import { Cart } from '../../Interfaces/cart.js'; 
import { con } from '../../server.js'; 


export async function insertCarts(cart: Cart) : Promise<ObjectId | null>{
    
    // const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    const db : Db = await client.db("flowerProduct")
    const collection: Collection <Cart> = db.collection<Cart>('carts')

    const result: InsertOneResult<Cart> = await collection.insertOne(cart)

    return result.insertedId
}