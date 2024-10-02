import { MongoClient, Db, Collection, FindCursor, WithId } from "mongodb";
import { Cart } from "../../Interfaces/cart.js";
import { Flower } from "../../Interfaces/product.js";
import { User } from "../../Interfaces/user.js";
import { con } from "../connection.js";

export async function createCarts(): Promise<WithId<Cart>[]> {


    if (!con) {
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    try {

        const db: Db = await client.db("flowerProduct")
        const collectionCarts: Collection<Cart> = db.collection<Cart>('carts')
        const collectionFlowers: Collection<Flower> = db.collection<Flower>('flowers')
        const collectionUsers: Collection<User> = db.collection<User>('users')
    
        
        const cursorCart: FindCursor<WithId<Cart>> = collectionCarts.find({})
        const cartList: WithId<Cart>[] = await cursorCart.toArray()
        
        const newFlowers = await collectionFlowers.find({}).limit(cartList.length).toArray()
        const newUsers = await collectionUsers.find({}).toArray()
        
                newFlowers.forEach(async (flower, index) => {
                    const cart = cartList[index]
                    await collectionCarts.updateOne(
                        { _id: cart._id },
                        { $set: { productId: flower._id } }
                    )
                }
                ) 
                let x = 0
                for (let i = 0; i < cartList.length ; i++) {
                    const cart = cartList[i]
                    if (x >= newUsers.length) {
                        x = 0
                    }
                    console.log(cart._id);
                    console.log(newUsers[x])
                    
                    await collectionCarts.updateOne(
                        { _id: cart._id },
                        { $set: { userId: newUsers[x]._id } }
                    )
                    x++
                }

    
        return cartList
    }catch (error) {
        console.error('Error fetching Carts', error);
        throw error;
    }finally {
        await client.close()

    }

}