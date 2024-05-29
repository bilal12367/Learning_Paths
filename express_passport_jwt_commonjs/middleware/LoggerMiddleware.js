const logger = require("../logger/logger")
const User = require("../schemas/User")

const LoggerMiddleware = async (req, res, next) => {
    logger.info("====================================================")
    logger.info("Resource Access Request")
    logger.info("User: ", await User.findOne({ _id: req.user.userId }))

    logger.info("URL: ", req.url)
    logger.info("Original URL: ", req.originalUrl)
    logger.info("====================================================")
    next()
}

module.exports = LoggerMiddleware;