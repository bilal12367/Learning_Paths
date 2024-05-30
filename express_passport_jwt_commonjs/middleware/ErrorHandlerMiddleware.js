const mongoose = require("mongoose")
const passport = require('passport')
const HttpStatus = require('http-status-codes')
const logger = require("../logger/logger")
const ErrorHandlerMiddleware = (err, req, res, next) => {
    logger.error("Error Caught: ", err)
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
            success: false,
            type: "Validation Error",
            error: err
        })
    } else if (err.name == "AuthenticationError") {
        res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: err
        })
    } else {
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err
        })
    }
}


module.exports = ErrorHandlerMiddleware