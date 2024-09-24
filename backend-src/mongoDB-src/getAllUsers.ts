import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { Users } from "../Interfaces/user.js";

export async function getAllUsers() {

    const con: string | undefined = process.env.CONNECTION_STRING
    if(!con) {
        console.log("Error: connection string not found");
        return
    }
    try {
        const client: MongoClient = new MongoClient(con)
        const db : Db = await client.db("flowerProduct")
        const collection: Collection <Users> = db.collection<Users>('users')

    
        const cursor: FindCursor <WithId<Users>> = collection.find({})
        const found: WithId<Users>[] = await cursor.toArray()
        
        if(found.length < 1) {
            console.log( "No products in cart today :/");
            return
        }
        found.forEach(user => {
            console.log(user.name);
            
        });
        
    }catch(error) {
        console.log("Failed ", error);
        
    }
}