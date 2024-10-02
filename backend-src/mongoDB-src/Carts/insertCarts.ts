import { Collection, Db, InsertOneResult, MongoClient, ObjectId } from 'mongodb';
import { Cart } from '../../Interfaces/cart.js'; 
import { connectToDatabase } from '../connection.js';
import { ClientType } from '../../Interfaces/ClientType.js';

type CartDocument = Cart & Document; 
let x: ClientType<CartDocument> 

export async function insertCarts(cart: Cart) : Promise<ObjectId | null>{
    
    try {
        x = await connectToDatabase<CartDocument>("carts")
    
        const result: InsertOneResult<CartDocument> = await x.collection.insertOne(cart as CartDocument)
    
        return result.insertedId
        
    }catch (error) {
        console.error('Error fetching Carts', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }

    }
}