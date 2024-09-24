import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Cart } from '../Interfaces/cart.js'
import { getAllCarts } from '../mongoDB-src/getAllCarts.js'

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