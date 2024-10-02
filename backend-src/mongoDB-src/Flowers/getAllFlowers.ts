import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";


type FlowerDocument = Flower & Document; 
let x: ClientType<FlowerDocument> 

async function getAllFlowers(): Promise<WithId<Flower>[]> {
    
    try {
        x = await connectToDatabase<FlowerDocument>("flowers")
        
        const cursor: FindCursor <WithId<Flower>> = x.collection.find({})
        const found: WithId<Flower>[] = await cursor.toArray()
        if(found.length < 1) {
            console.log( "No Flower awailable today :/");
            
        }
        
        return found
        
    }catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    } finally {
        if(x) {
            await x.client.close()

        }

    }
}




export {getAllFlowers}
