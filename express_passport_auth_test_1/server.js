import express from 'express'
import bodyParser from 'body-parser'
import 'express-async-errors'
import cors from 'cors'
import { AuthRouter } from './router/AuthRouter.js';
import { UserRouter } from './router/UserRouter.js';
import { configDotenv } from 'dotenv';
import { connectToDb } from './utils/connectToDb.js'
import { ErrorHandlerMiddleware } from './middleware/ErrorHandlerMiddleware.js'
import passport from 'passport';
import passportConfig from './middleware/passportConfig.js'

configDotenv()

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize())

passportConfig(passport);

app.use("/auth", AuthRouter)
app.use("/api", passport.authenticate('jwt', {session: false}), UserRouter)

app.use(ErrorHandlerMiddleware)

app.listen(process.env.PORT || 5000, async () => {
    await connectToDb();
    console.log("Server started listening at port ", process.env.PORT || 5000, ' ...')
})

