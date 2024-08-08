
import express, { Express } from 'express'

const app: Express = express();


app.listen(5000, () => {
    console.log("Server Started listening at port 5000...")
})