
import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.configDotenv()

const app: Express = express();



app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started listening at port ",process.env.PORT || 5000,"...")
})