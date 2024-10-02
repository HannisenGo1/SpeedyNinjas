import { Collection, Db, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { Flower } from "../../Interfaces/product.js"; 
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";

type FlowerDocument = Flower & Document; 
let x: ClientType<FlowerDocument> 

export async function deleteFlower(index: ObjectId) {

    try {

        x = await connectToDatabase<FlowerDocument>("flowers")
        const filter = {_id: index}
    
        const result: DeleteResult = await x.collection.deleteOne(filter)
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
        } 
        console.log(`deleted: ${result.deletedCount}`);
        return result
    }catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }

    }
    
}