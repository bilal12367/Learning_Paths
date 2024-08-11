import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import AuthRouter from './router/AuthRouter'
import 'express-async-errors'
import connectToMongo from './util/connectToMongo'
import { ExtractJwt, Strategy } from 'passport-jwt'
import passport from 'passport'
import init_Passport from './config/InitPassport'
import session from 'express-session'

dotenv.configDotenv()

const app: Express = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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

app.use("/test", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        user: req.user,
        data: "value"
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started listening at port ", process.env.PORT || 5000, "...")
    connectToMongo()
})