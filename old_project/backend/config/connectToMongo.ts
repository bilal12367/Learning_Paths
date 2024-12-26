import mongoose from "mongoose"
import ConsoleLogger from "./logger/ConsoleLogger"

const connectToMongo = async () => {
    await mongoose.connect(process.env.URL as string).then( () => {
        ConsoleLogger.debug("Mongo Connected Successfully!!")
    })
}

export default connectToMongo