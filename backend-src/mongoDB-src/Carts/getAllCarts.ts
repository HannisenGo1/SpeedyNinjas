import { MongoClient, Db, Collection, FindCursor, WithId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";


type CartDocument = Cart & Document; 
let x: ClientType<CartDocument> 

export async function getAllCarts(): Promise<WithId<Cart>[]> {

        try {

            x = await connectToDatabase<CartDocument>("carts")
    
            const cursor: FindCursor <WithId<Cart>> = x.collection.find({})
            const found: WithId<Cart>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No products in cart today :/");
            }
        
        return found

        }catch (error) {
            console.error('Error fetching Carts', error);
            throw error;
        }finally {
            if(x) {
                await x.client.close()
    
            }

        }
}