import express, { Request, Response, Router } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { Cart } from '../Interfaces/cart.js'
import { getAllCarts } from '../mongoDB-src/Carts/getAllCarts.js' 
import { insertCarts } from '../mongoDB-src/Carts/insertCarts.js' 
import { deleteCart } from '../mongoDB-src/Carts/deleteCart.js' 
import { updateCart } from '../mongoDB-src/Carts/updateCart.js' 
import { getOneCart } from '../mongoDB-src/Carts/getOneCart.js'


export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<Cart>[]> ) =>{
    try{ 
  const allCarts: WithId<Cart> [] = await getAllCarts();
  if (!allCarts || allCarts.length ===0) { 
    return res.sendStatus(404)
}
  res.send(allCarts)  
    } catch (error) {
      res.sendStatus(500)
    }
  });


router.get('/:id', async (req:Request, res:Response<WithId<Cart>[]> ) =>{
  try {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)
  const oneCart: WithId<Cart> [] = await getOneCart(objectId)
  if (!oneCart) {
    return res.sendStatus(404)
  }
   res.send(oneCart) 
  } catch (error) { 
  console.error("couldnt fetch cart", error)
  res.sendStatus(500)
    }
});


router.post('/', async (req: Request, res: Response) => {
  const newCart: Cart = req.body
  const insertedCart =  await insertCarts(newCart)
  
  if(insertedCart == null){
    res.sendStatus(400)
    return
  }

  console.log("Detta är body: ", newCart);
  res.sendStatus(201)
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)

  const updatedFields: Cart = req.body
  await updateCart(objectId, updatedFields)
  if (!updateCart) {
    return res.sendStatus(404)
  }
  res.sendStatus(201)
  } catch (error) {
    console.error("Wrong with update the cart")
    res.sendStatus(500)
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)
  await deleteCart(objectId)
    if(!deleteCart) {
      return res.sendStatus(404)
    }
     res.sendStatus(204)
  } catch (error) {
    console.error ("wrong with deleting carts", error)
    res.sendStatus(500)
  }
});