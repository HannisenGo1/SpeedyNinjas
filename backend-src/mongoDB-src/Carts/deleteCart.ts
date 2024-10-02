import { Collection, Db, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type CartDocument = Cart & Document; 
let x: ClientType<CartDocument> 

export async function deleteCart(index: ObjectId) {
   
    try {
        x = await connectToDatabase<CartDocument>("carts")
        
        const filter = {_id: index}
    
        const result: DeleteResult = await x.collection.deleteOne(filter)
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return 
    
        } 
        console.log(`deleted: ${result.deletedCount}`);
        return result
      
    }catch (error) {
        console.error('Error fetching Carts', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }

    }

    
}