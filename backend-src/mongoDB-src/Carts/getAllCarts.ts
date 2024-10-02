import { MongoClient, Db, Collection, FindCursor, WithId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js"; 
import { con } from "../../server.js"; 
import { connectToDatabase } from "../connection.js";

export async function getAllCarts(): Promise<WithId<Cart>[]> {

    // const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
        const client: MongoClient = new MongoClient(con)
        try {

            const collection: Collection<Cart> = await connectToDatabase<Cart>("carts")
    
            const cursor: FindCursor <WithId<Cart>> = collection.find({})
            const found: WithId<Cart>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No products in cart today :/");
            }
        
        return found

        }catch (error) {
            console.error('Error fetching Carts', error);
            throw error;
        }finally {
            await client.close()
    
        }
}