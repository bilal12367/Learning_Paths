const mongoose = require("mongoose");
const logger = require("../logger/logger");


module.exports = connectToDb = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    logger.info("Mongodb Connected Successfully!!")
}