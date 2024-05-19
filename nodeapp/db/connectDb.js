import mongoose from "mongoose";

const connectToMongo = async () => {
    const url = process.env.MONGO_URL || "mongodb://mongo-lb.default.svc.cluster.local:27017/?replicaSet=rs0&readPreference=secondaryPreferred"
    await mongoose.connect(url)
    console.log("Successfully Connected to Mongo");
}

export { connectToMongo }