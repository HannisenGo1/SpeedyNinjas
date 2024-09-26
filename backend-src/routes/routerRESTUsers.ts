
import express, { Request, Response, Router } from 'express'
import { WithId, ObjectId } from 'mongodb'
import { User } from '../Interfaces/user.js'
import { getAllUsers } from '../mongoDB-src/Users/getAllUsers.js' 
import { insertUser } from '../mongoDB-src/Users/insertUser.js' 
import { updateUser } from '../mongoDB-src/Users/updateUser.js' 
import { deleteUser } from '../mongoDB-src/Users/deleteUser.js'
import { getOneUser } from '../mongoDB-src/Users/getOneUser.js'
import { searchUser } from '../mongoDB-src/Users/searchUser.js'

export const router: Router = express.Router()

router.get('/', async (req:Request, res:Response<WithId<User>[]> ) =>{
    try {
      const allUsers: WithId<User> [] = await getAllUsers()
      if (!allUsers) {
        return res.sendStatus(404)
      }
      res.send(allUsers)  
    } catch (error) {
      res.sendStatus(500)
    }
});

  router.get(
    "/search",
    async (req: Request, res: Response<WithId<User>[] | string>) => {
      console.log(req.query);
      const searchString: string | undefined = req.query.q as string;
      console.log(searchString);
      
      if (!searchString) {
        res.sendStatus(400);
      }
      
      try {
        // kör sökningen
        const results = await searchUser(searchString, res);
            if (results.length === 0) {
              return res.status(404).send("No user found");
            }
            else {
              return res.json(results);
            }
  
      } catch (error) {
        console.error("Error searching for user: ", error);
        return res.status(500).send("Server error");
      }
    }
  );

  router.get('/:id', async (req:Request, res:Response<WithId<User>[]> ) =>{
    try {
        const id: string = req.params.id
        const objectId: ObjectId = new ObjectId(id)
        const oneUser: WithId<User> [] = await getOneUser(objectId)
        if (!oneUser) {
    return res.sendStatus(404)
    }
     res.send(oneUser) 
    } catch (error) {
    console.error("couldnt fetch user", error)
    res.sendStatus(500)
    }
    });

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

  router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const objectId: ObjectId = new ObjectId(id)
      
        const updatedFields: User = req.body
        await updateUser(objectId, updatedFields)
    if (!updateUser) {
    return res.sendStatus(404)
    }
        res.sendStatus(201)
      } catch (error) {
    console.error("wrong with update user")
    res.sendStatus(500)
    }
    });



router.delete("/:id", async (req: Request, res: Response) => {
try {
    const id: string = req.params.id
    const objectId: ObjectId = new ObjectId(id)
    
    await deleteUser(objectId)

if (!deleteUser) {
return res.sendStatus(404) 
}
    res.sendStatus(204)
 } catch (error) {
console.error("wrong with deleting user", error)
res.sendStatus(500) 
  }
  })