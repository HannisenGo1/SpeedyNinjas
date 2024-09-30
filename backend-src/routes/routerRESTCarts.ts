import express, { Request, Response, Router } from 'express'
import { WithId, ObjectId, UpdateResult } from 'mongodb'
import { Cart } from '../Interfaces/cart.js'
import { getAllCarts } from '../mongoDB-src/Carts/getAllCarts.js' 
import { insertCarts } from '../mongoDB-src/Carts/insertCarts.js' 
import { deleteCart } from '../mongoDB-src/Carts/deleteCart.js' 
import { updateCart } from '../mongoDB-src/Carts/updateCart.js' 
import { getOneCart } from '../mongoDB-src/Carts/getOneCart.js'
import { isValidCart, isValidFlower, isValidUser } from '../data/validation.js'

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
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.sendStatus(400)
    }
    const objectId: ObjectId = new ObjectId(id);
  const oneCart: WithId<Cart> [] = await getOneCart(objectId)
  if (oneCart.length < 1) {
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
  if (isValidCart(newCart)){
    await insertCarts(newCart)
    res.sendStatus(201)
  }
  else{
    res.sendStatus(400)
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
  const id: string = req.params.id

  if (!ObjectId.isValid(id)) {
    return res.sendStatus(400)
  }
  const objectId: ObjectId = new ObjectId(id)

  const updatedFields: Cart = req.body
  const result: UpdateResult<Cart> | undefined = await updateCart(objectId, updatedFields)
  if (result?.upsertedCount === 0) {
    return res.sendStatus(404)
 }else {

  return res.sendStatus(201)
 }

} catch (error) {
console.error("Error updating cart")
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