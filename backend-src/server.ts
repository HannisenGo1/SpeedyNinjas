import express, { Express, NextFunction, Request, Response } from 'express'
import { getAllFlowers } from './mongoDB-src/getAllFlowers.js'
import { getAllCarts } from './mongoDB-src/getAllCarts.js'
import { getAllUsers } from './mongoDB-src/getAllUsers.js'
import { router as FlowerRouter } from './routes/routerGETflowers.js'

const app: Express = express()
const port = 1000

getAllFlowers()
getAllCarts()
getAllUsers()

app.use("/flowers", FlowerRouter)

// starta servern
app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})