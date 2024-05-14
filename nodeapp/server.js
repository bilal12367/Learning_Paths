import express from 'express'

import bodyParser from 'body-parser'
import { customerRouter } from './router/CustomerRouter.js'
import 'express-async-errors'
import { ErrorHandlerMiddleware } from './middleware/ErrorHandlerMiddleware.js'
import { configDotenv } from 'dotenv'
import {connectToMongo} from './db/connectDb.js'
configDotenv()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use("/api/",customerRouter)

app.use(ErrorHandlerMiddleware)

app.listen(process.env.PORT || 5000, async () => {
    console.log("Server started listening at ",process.env.PORT || 5000," ...")
    await connectToMongo()
})
