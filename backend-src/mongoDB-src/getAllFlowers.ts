import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { Flowers } from "../Interfaces/product.js";


async function getAllFlowers() {

    const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        return
    }
    try {
        const client: MongoClient = new MongoClient(con)
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <Flowers> = db.collection<Flowers>('flowers')

    
        const cursor: FindCursor <WithId<Flowers>> = collection.find({})
        const found: WithId<Flowers>[] = await cursor.toArray()
        
        if(found.length < 1) {
            console.log( "No Flower awailable today :/");
            return
        }
        found.forEach(flower => {
            console.log(flower.name, flower.image, flower.price);
            
        });
        
    }catch(error) {
        console.log("Failed ", error);
        
    }
}

// getAllFlowers()
export {getAllFlowers}
