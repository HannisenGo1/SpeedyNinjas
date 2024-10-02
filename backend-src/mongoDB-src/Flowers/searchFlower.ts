import { Collection, Db, MongoClient, ObjectId, WithId } from "mongodb";
import { Flower } from "../../Interfaces/product.js";
import { connectToDatabase } from "../connection.js";
import { ClientType } from "../../Interfaces/ClientType.js";


type FlowerDocument = Flower & Document; 
let x: ClientType<FlowerDocument> 

export async function searchFlower(searchString: string): Promise<WithId<Flower>[] > {
    
    try {

        x = await connectToDatabase<FlowerDocument>("flowers")
        const searchterm = searchString.split(" ").map(term => term.trim()).filter(term => term.length > 0)
        const flowerQueries = searchterm.map(term => ({
            name: {$regex: new RegExp(term, "i")}
        }))
        
        const flowers = await x.collection
        .find({ $or: flowerQueries}).toArray()
        
        return flowers;
        
    } catch (error) {
        console.error('Error fetching flowers', error);
        throw error;
    } finally {
        if(x) {
            await x.client.close()

        }
    }
   
}
