import express, { Request, Response, Router } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { Cart } from '../Interfaces/cart.js'
import { getAllCarts } from '../mongoDB-src/getAllCarts.js'
import { insertCarts } from '../mongoDB-src/insertCarts.js'
import { deleteCart } from '../mongoDB-src/deleteCart.js'
import { updateCart } from '../mongoDB-src/updateCart.js'


export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<Cart>[]> ) =>{
    
  const allCarts: WithId<Cart> [] = await getAllCarts()
  
  res.send(allCarts)  

    }
)


router.post('/', async (req: Request, res: Response) => {
  const newCart: Cart = req.body
  const insertedCart =  await insertCarts(newCart)
  
  if(insertedCart == null){
    res.sendStatus(400)
    return
  }

  console.log("Detta är body: ", newCart);
  res.sendStatus(201)
})

router.put('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)

  const updatedFields: Cart = req.body
  await updateCart(objectId, updatedFields)
  res.sendStatus(201)
})

router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)
  
  await deleteCart(objectId)
  res.sendStatus(204)


})