
import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Flower } from '../Interfaces/product.js'
import { getAllFlowers } from '../mongoDB-src/getAllFlowers.js'
import { insertFlower } from '../mongoDB-src/insertFlower.js'


export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<Flower>[]> ) =>{
    
  const allFlowers: WithId<Flower> [] = await getAllFlowers()
  
  res.send(allFlowers)  

    }
)

router.post('/', async (req: Request, res: Response) => {
  const newFlower: Flower = req.body
  insertFlower(newFlower)
  if(insertFlower(newFlower) == null){
    res.sendStatus(400)
    return
  }
  res.sendStatus(201)
})