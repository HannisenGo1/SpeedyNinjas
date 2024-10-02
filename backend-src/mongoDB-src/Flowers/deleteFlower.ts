import { Collection, Db, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { con } from "../../server.js"; 
import { connectToDatabase } from "../connection.js";



export async function deleteFlower(index: ObjectId) {
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    
    const client: MongoClient = new MongoClient(con)
    try {
        // const db : Db = await client.db("flowerProduct")
        // const collection: Collection <Flower> = db.collection<Flower>('flowers')
        const collection: Collection<Flower> = await connectToDatabase<Flower>("flowers")
        const filter = {_id: index}
    
        const result: DeleteResult = await collection.deleteOne(filter)
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
            
        } 
        console.log(`deleted: ${result.deletedCount}`);
    }catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    }finally {
        await client.close()

    }
    
}