import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Cart } from '../Interfaces/cart.js'
import { getAllCarts } from '../mongoDB-src/getAllCarts.js'
import { insertCarts } from '../mongoDB-src/insertCarts.js'


export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<Cart>[]> ) =>{
    
  const allCarts: WithId<Cart> [] = await getAllCarts()
  
  res.send(allCarts)  

    }
)

//router.post('/carts', async (req:Request, res:Response) => {
//  const newCart: Cart = req.body
//  insertCart(newCart)
// if (insertCart(newCart) == null){
// res.sendStatus(404)
//}
//  res.sendStatus(201)
// })

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