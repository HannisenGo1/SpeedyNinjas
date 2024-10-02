import { Collection, Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { Cart } from "../../Interfaces/cart.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type CartDocument = Cart & Document; 
let x: ClientType<CartDocument> 


export async function updateCart(index: ObjectId, body: Object) {

    try {
        
        x = await connectToDatabase<CartDocument>("carts")
    
            const filter = {_id: index}
        
            const result: UpdateResult<Cart>  = await x.collection.updateOne(filter, {$set: body })
            if (!result.acknowledged) {
                console.log("Did not find a matching dokument");
                return
                
            } 
            console.log(`deleted: ${result.upsertedCount}`);
            return result
            
        }catch (error){
            console.error('Error fetching Carts', error);
            throw error;
        }finally {
            if(x) {
                await x.client.close()
    
            }

        }
}

