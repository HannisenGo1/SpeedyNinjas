import { Collection, Db, FindCursor, MongoClient, ObjectId, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js";
import { con } from "../../server.js";


export async function getOneFlower(id: ObjectId): Promise<WithId<Flower>[]> {



    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
        const client: MongoClient = new MongoClient(con)
        try {
            const db : Db = await client.db("flowerProduct")
            const collection: Collection <Flower> = db.collection<Flower>('flowers')
    
            const filter = {_id: id}
            const cursor: FindCursor <WithId<Flower>> = collection.find(filter)
            const found: WithId<Flower>[] = await cursor.toArray()
            
            if(found.length < 1) {
                console.log( "No Flower awailable today :/");
            
            }
            return found
            
        }catch (error) {
            console.error('Error fetching flowers', error);
            throw error;
        }finally {
            await client.close()

        }
}