import mongoose from "mongoose"


export const connectToDb = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb Connected Successfully!!")
}