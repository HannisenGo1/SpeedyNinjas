
import express, { Request, Response, Router } from 'express'
import { ObjectId, WithId } from 'mongodb'
import { Flower } from '../Interfaces/product.js'
import { getAllFlowers } from '../mongoDB-src/Flowers/getAllFlowers.js' 
import { insertFlower } from '../mongoDB-src/Flowers/insertFlower.js' 
import { updateFlower } from '../mongoDB-src/Flowers/updateFlower.js' 
import { deleteFlower } from '../mongoDB-src/Flowers/deleteFlower.js' 


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

router.put('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)

  const updatedFields: Flower = req.body
  await updateFlower(objectId, updatedFields)
  res.sendStatus(201)
})


router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id
  const objectId: ObjectId = new ObjectId(id)
  
  await deleteFlower(objectId)
  res.sendStatus(204)


})