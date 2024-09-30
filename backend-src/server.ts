import express, { Express, NextFunction, Request, Response } from 'express'
import { router as flowerRouter } from './routes/routerRESTflowers.js'
import { router as cartRouter } from './routes/routerRESTCarts.js'
import { router as userRouter } from './routes/routerRESTUsers.js'
import { resetDatabase } from './mongoDB-src/resetDatabase.js'



export const con: string | undefined = process.env.CONNECTION_STRING

const app: Express = express()
const port = 1000

app.use( express.json() )
 

app.use('/', (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	next()
})

// ** unkomment for reset of database
resetDatabase() 

app.use('/', express.static('./frontend'));

app.use("/flowers", flowerRouter)
app.use("/carts", cartRouter)
app.use("/users", userRouter)


// starta servern
app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})