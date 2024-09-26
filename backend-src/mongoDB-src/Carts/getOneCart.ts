import { Collection, Db, FindCursor, MongoClient, ObjectId, WithId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js";
import { con } from "../../server.js";



export async function getOneCart(id: ObjectId): Promise<WithId<Cart>[]> {

    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
        const client: MongoClient = new MongoClient(con)
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <Cart> = db.collection<Cart>('carts')

        const filter = {_id: id}
        const cursor: FindCursor <WithId<Cart>> = collection.find(filter)
        const found: WithId<Cart>[] = await cursor.toArray()
        
        if(found.length < 1) {
            console.log( "No Cart awailable today :/");
        
        }
        
        return found
}