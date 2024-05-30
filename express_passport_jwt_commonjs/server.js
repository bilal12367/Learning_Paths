const express = require('express')
require('express-async-errors')
const { configDotenv } = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const UserRouter = require('./router/user.router')
const AuthRouter = require('./router/auth.router')
const ErrorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware')
const logger = require('./logger/logger')
const connectToDB = require('./utils/connectToDB')
const passport = require('passport')
const PassportConfig = require('./utils/passportConfig')
const User = require('./schemas/User')
const LoggerMiddleware = require('./middleware/LoggerMiddleware')

configDotenv()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}))

app.use(passport.initialize())
PassportConfig(passport)


app.use("/auth", AuthRouter);

app.use("/api", passport.authenticate('jwt', { session: false, failWithError: true }), LoggerMiddleware, UserRouter)

app.use(ErrorHandlerMiddleware)

app.listen(process.env.PORT || 5000, async () => {
    logger.info("Server started listening at port ", process.env.PORT, " ...")
    await connectToDB();
    
})