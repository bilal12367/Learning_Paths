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

app.get("/test", (req,res) => {
    res.send("Success Hit Get ~~~")
})

app.post("/testPost", (req,res) => {
    res.json({
        data: "Success Hit~~"
    })
})

app.use("/api/",customerRouter)

app.use(ErrorHandlerMiddleware)

app.listen(process.env.PORT || 5000, async () => {
    try {
        console.log("Server started listening at ",process.env.PORT || 5000," ...")
        console.log("Env Vars:")
        console.log("Port: ",process.env.PORT)
        console.log("Mongourl: ",process.env.MONGO_URL)
        await connectToMongo()
        
    } catch (error) {
        console.log("Error in startup: ",error)
    }
})
