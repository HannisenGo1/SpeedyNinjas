import { Collection, Db, FindCursor, MongoClient, ObjectId, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js";
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type FlowerDocument = Flower & Document; 
let x: ClientType<FlowerDocument> 

export async function getOneFlower(id: ObjectId): Promise<WithId<Flower>[]> {
    
        try {
            // const db : Db = await client.db("flowerProduct")
            // const collection: Collection <Flower> = db.collection<Flower>('flowers')
            x = await connectToDatabase<FlowerDocument>("flowers")
            const filter = {_id: id}
            const cursor: FindCursor <WithId<Flower>> = x.collection.find(filter)
            const found: WithId<Flower>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No Flower awailable today :/");
            
            }
            return found
            
        }catch (error) {
            console.error('Error fetching flowers', error);
            throw error;
        }finally {
            if(x) {
                await x.client.close()
    
            }

        }
}