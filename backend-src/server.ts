import express, { Express, NextFunction, Request, Response } from 'express'
import { getAllFlowers } from './mongoDB-src/getAllFlowers.js'
import { getAllCarts } from './mongoDB-src/getAllCarts.js'
import { getAllUsers } from './mongoDB-src/getAllUsers.js'
import { router as flowerRouter } from './routes/routerRESTflowers.js'
import { router as cartRouter } from './routes/routerRESTCarts.js'
import { router as userRouter } from './routes/routerRESTUsers.js'

export const con: string | undefined = process.env.CONNECTION_STRING

const app: Express = express()
const port = 1000

getAllFlowers()
getAllCarts()
getAllUsers()

app.use("/flowers", flowerRouter)
app.use("/carts", cartRouter)
app.use("/users", userRouter)


// starta servern
app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})