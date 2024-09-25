import { Collection, Db, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js"; 
import { con } from "../../server.js"; 


export async function deleteCart(index: ObjectId) {
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    
    const client: MongoClient = new MongoClient(con)

    const db : Db = await client.db("flowerProduct")
    const collection: Collection <Cart> = db.collection<Cart>('carts')
    const filter = {_id: index}

    const result: DeleteResult = await collection.deleteOne(filter)
    if (!result.acknowledged) {
        console.log("Did not find a matching dokument");
        return

    } 
    console.log(`deleted: ${result.deletedCount}`);
    
}