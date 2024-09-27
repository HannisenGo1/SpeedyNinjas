import express, { Request, Response, Router } from "express";
import { ObjectId, WithId, UpdateResult } from "mongodb";
import { Flower } from "../Interfaces/product.js";
import { getAllFlowers } from "../mongoDB-src/Flowers/getAllFlowers.js";
import { insertFlower } from "../mongoDB-src/Flowers/insertFlower.js";
import { updateFlower } from "../mongoDB-src/Flowers/updateFlower.js";
import { deleteFlower } from "../mongoDB-src/Flowers/deleteFlower.js";
import { getOneFlower } from "../mongoDB-src/Flowers/getOneFlower.js";
import { searchFlower } from "../mongoDB-src/Flowers/searchFlower.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Flower>[]>) => {
  try{
      const allFlowers: WithId<Flower>[] = await getAllFlowers();
      if (!allFlowers || allFlowers.length === 0 ) {
        return res.sendStatus(404)
      }
      res.send(allFlowers) 
  } catch (error){
    res.sendStatus(500)
  }
});

router.get(
  "/search",
  async (req: Request, res: Response<WithId<Flower>[] | string>) => {
    console.log(req.query);
    const searchString: string | undefined = req.query.q as string;
    console.log(searchString);
    
    if (!searchString) {
      res.sendStatus(400);
    }
    
    try {
      const results = await searchFlower(searchString);

          if (results.length === 0) {
            return res.status(404).send("Inga blommor här");
          }
          else {
            return res.json(results);
          }
    } catch (error) {
      console.error("Error searching for flowers: ", error);
      return res.status(500).send("Server error");
    }
  }
);

router.get("/:id", async (req: Request, res: Response<WithId<Flower>[]>) => {
 try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.sendStatus(400)
    }
    const objectId: ObjectId = new ObjectId(id);
    const oneFlowers: WithId<Flower>[] = await getOneFlower(objectId);
    if (oneFlowers.length < 1) {
      return res.sendStatus(404)
    }
  res.send(oneFlowers);
  }
  catch (error){
  console.error("couldnt fetch flower", error)
  res.sendStatus(500)
}
}
);

router.post("/", async (req: Request, res: Response) => {
  const newFlower: Flower = req.body;
  if (newFlower.name && newFlower.image && newFlower.amountInStock && newFlower.price){  
    await insertFlower(newFlower);
    res.sendStatus(201);
  }
  else{
    res.sendStatus(400)
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
  const id: string = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(400)
  }
  const objectId: ObjectId = new ObjectId(id);
  const updatedFields: Flower = req.body;
  const result: UpdateResult<Flower> | undefined = await updateFlower(objectId, updatedFields);
   if (result?.upsertedCount === 0){
    return res.sendStatus(404)
  }
  else {
    res.sendStatus(201);
  }
} catch (error){
  console.error(" wrong with update the flower")
  res.sendStatus(500)
}
});

router.delete("/:id", async (req: Request, res: Response) => {
  try{
   const id: string = req.params.id;
  const objectId: ObjectId = new ObjectId(id);

  await deleteFlower(objectId);

  if (! deleteFlower) {
    return res.sendStatus(404)
  }
  res.sendStatus(204); 
} catch (error) {
  console.error("wrong with deleting flower", error)
  res.sendStatus(500)
}
});
