import { Collection, Db, InsertOneResult, MongoClient, ObjectId } from 'mongodb';
import { Cart } from '../../Interfaces/cart.js'; 
import { con } from '../../server.js'; 
import { connectToDatabase } from '../connection.js';


export async function insertCarts(cart: Cart) : Promise<ObjectId | null>{
    
    // const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    try {
        const collection: Collection<Cart> = await connectToDatabase<Cart>("carts")
    
        const result: InsertOneResult<Cart> = await collection.insertOne(cart)
        return result.insertedId
        
    }catch (error) {
        console.error('Error fetching Carts', error);
        throw error;
    }finally {
        await client.close()

    }
}