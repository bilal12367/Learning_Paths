import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import AuthRouter from './router/AuthRouter'
import 'express-async-errors'
import connectToMongo from './config/connectToMongo'
import { ExtractJwt, Strategy } from 'passport-jwt'
import passport from 'passport'
import init_Passport from './config/InitPassport'
import session from 'express-session'
import ErrorHandlerMiddleware from './middleware/ErrorHandlerMiddleware'
import { TokenExpiredError } from 'jsonwebtoken'
import { TokenInvalid } from './util/errors/TokenInvalid'
import AuthErrorHandler from './middleware/AuthErrorHandler'
import ProtectedRouter from './router/ProtectedRouter'
import cookieParser from 'cookie-parser';
import cors from 'cors'


dotenv.configDotenv()

const app: Express = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(cookieParser(process.env.REFRESH_SECRET))
// Session configuration
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false, // Forces the session to be saved back to the store even if it was not modified
    saveUninitialized: true, // Save a new session that is uninitialized
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // Set cookie options, secure should be true in production
    // store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/your-db-name' }) // Use if you want to store sessions in MongoDB
}));



init_Passport(passport);
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", AuthRouter);
// app.use("/test", function (req,res,next) {
//     console.log("Middleware invoked")
//     return passport.authenticate('jwt', { session: true },function(err:any,user:any,info:any) {
//         console.log({err,user,info})
//         if(err) {
//             res.status(500).json({message: "Unauth custom error"})
//         }

//         if(user) {
//             next(user)
//         }
//     })
// } , (req: Request, res: Response) => {
//     res.status(200).json({
//         user: req.user,
//         data: "value"
//     })
// })
app.use("/api", passport.authenticate('jwt', { failWithError: true, session: false }), AuthErrorHandler, ProtectedRouter)

app.use(ErrorHandlerMiddleware)



app.listen(process.env.PORT || 5000, async () => {

    console.log("Server Started listening at port ", process.env.PORT || 5000, "...")
    await connectToMongo()
    
})