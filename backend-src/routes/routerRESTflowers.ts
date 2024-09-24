
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
  const insertedFlower =  await insertFlower(newFlower)
  
  if(insertedFlower == null){
    res.sendStatus(400)
    return
  }

  console.log("Detta är body: ", newFlower);
  res.sendStatus(201)
})