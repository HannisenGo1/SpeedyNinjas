
import express, { Request, Response, Router } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { User } from '../Interfaces/user.js'
import { getAllUsers } from '../mongoDB-src/getAllUsers.js'
import { insertUser } from '../mongoDB-src/insertUser.js'
import { deleteUser } from '../mongoDB-src/deleteUser.js'

export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<User>[]> ) =>{
    
    const allUsers: WithId<User> [] = await getAllUsers()
    
    res.send(allUsers)  
  
    }
  )

  router.post('/', async (req: Request, res: Response) => {
    const newUser: User = req.body
    const insertedUser =  await insertUser(newUser)
    
    if(insertedUser == null){
      res.sendStatus(400)
      return
    }
  
    console.log("Detta är body: ", newUser);
    res.sendStatus(201)
  })

  router.delete("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id
    const objectId: ObjectId = new ObjectId(id)
    
    await deleteUser(objectId)
    res.sendStatus(204)
  
  
  })