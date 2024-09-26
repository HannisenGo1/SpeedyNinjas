import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { con } from "../../server.js"; 


async function getAllFlowers(): Promise<WithId<Flower>[]> {

    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
        const client: MongoClient = new MongoClient(con)
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <Flower> = db.collection<Flower>('flowers')

    
        const cursor: FindCursor <WithId<Flower>> = collection.find({})
        const found: WithId<Flower>[] = await cursor.toArray()
        
        if(found.length < 1) {
            console.log( "No Flower awailable today :/");
        
        }

        return found
}

export {getAllFlowers}
