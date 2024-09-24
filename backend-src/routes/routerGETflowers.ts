
import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Flowers } from '../Interfaces/product.js'
import { getAllFlowers } from '../mongoDB-src/getAllFlowers.js'


export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<Flowers>[]> ) =>{
    
  const allFlower: WithId<Flowers> [] = await getAllFlowers()
  
  res.send(allFlower)  

    }
)