import express, { Express, NextFunction, Request, Response } from 'express'

const app: Express = express()
const port = 1000

// starta servern
app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})