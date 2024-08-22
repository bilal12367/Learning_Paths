import mongoose from "mongoose"


const connectToMongo = async () => {
    await mongoose.connect(process.env.URL as string).then( () => {
        console.log("Mongo Connected Successfully!!")
    })
}

export default connectToMongo