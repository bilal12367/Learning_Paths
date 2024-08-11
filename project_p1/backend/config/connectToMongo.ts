import mongoose from "mongoose"


const connectToMongo = async () => {
    await mongoose.connect("mongodb://localhost:27017/test").then( () => {
        console.log("Mongo Connected Successfully!!")
    })
}

export default connectToMongo