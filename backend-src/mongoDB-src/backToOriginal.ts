// Borde gå att lägga in data filerna i listor så kan vi bara köra delete all på alla collektioner och sedan en insert av de listorna

import { Collection, Db, FindCursor, MongoClient, WithId } from "mongodb";
import { Cart } from "../Interfaces/cart.js";
import { Flower } from "../Interfaces/product.js";
import { User } from "../Interfaces/user.js";
import { con } from '../server.js'
// import { carts } from '../data/carts.js'
// import { flowers } from '../data/flowers.js'
// import { users } from '../data/users.js'

export async function resetDatabase(){
    if(!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }

    const client: MongoClient = new MongoClient(con)
    const db : Db = await client.db("flowerProduct")
    const collectionCarts: Collection<Cart> = db.collection<Cart>('carts')
    const collectionFlowers: Collection<Flower> = db.collection<Flower>('flowers')
    const collectionUsers: Collection<User> = db.collection<User>('users')

    await collectionCarts.deleteMany({})
    await collectionFlowers.deleteMany({})
    await collectionUsers.deleteMany({})

}