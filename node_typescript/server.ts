import express, { Express, Request, Response } from 'express'

const app: Express = express();

app.get("/test", (req: Request, res: Response): void => {
    res.send("Success");
})


app.listen(5000, () => {
    console.log("Server started listening at 5000 .. .. ")
})