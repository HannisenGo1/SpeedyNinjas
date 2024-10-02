import { Collection, Db, FindCursor, MongoClient, ObjectId, WithId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js";
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type CartDocument = Cart & Document; 
let x: ClientType <CartDocument> 


export async function getOneCart(id: ObjectId): Promise<WithId<Cart>[]> {

        try {
            x = await connectToDatabase<CartDocument>("carts")

            const filter = {_id: id}
            const cursor: FindCursor <WithId<Cart>> = x.collection.find(filter)
            const found: WithId<Cart>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No Cart awailable today :/");
            
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