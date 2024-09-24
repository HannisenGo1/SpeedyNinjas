
import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { User } from '../Interfaces/user.js'
import { getAllUsers } from '../mongoDB-src/getAllUsers.js'


export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<User>[]> ) =>{
    
    const allUsers: WithId<User> [] = await getAllUsers()
    
    res.send(allUsers)  
  
    }
  )