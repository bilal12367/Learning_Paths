import { UserModel } from "../schema/User.js"
import logger from "../utils/logger.js"


const LoggerMiddleware = async (req, res, next) => {
    
    logger.info("====================================================")
    logger.info("Resource Access Request")
    
    logger.info("User: ",await UserModel.findOne({_id: req.user.userId}).select({_id: 1, firstName: 0, lastName:0, password: 0}))
    
    logger.info("URL: ",req.url)
    logger.info("Original URL: ",req.originalUrl)
    logger.info("====================================================")
    next();

}

export default LoggerMiddleware;