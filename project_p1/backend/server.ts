import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import AuthRouter from './router/AuthRouter'
import 'express-async-errors'
import connectToMongo from './util/connectToMongo'
dotenv.configDotenv()

const app: Express = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/auth" ,AuthRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started listening at port ", process.env.PORT || 5000, "...")
    connectToMongo()
})