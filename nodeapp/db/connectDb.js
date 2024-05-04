import mongoose from "mongoose";

const connectToMongo = async () => {
    const url = process.env.MONGO_URL || "mongodb://localhost:27017/test1?directConnection=true"
    await mongoose.connect(url)
    console.log("Successfully Connected to Mongo");
}

export { connectToMongo }