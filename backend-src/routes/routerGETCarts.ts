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