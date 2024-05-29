const mongoose = require("mongoose")


const ErrorHandlerMiddleware = (err, req,res , next) => {
    console.log("Error Caught: ", err)
    if(err instanceof mongoose.Error.ValidationError) {
        res.status(401).json({
            success: false,
            type: "Validation Error",
            error: err
        })
    }
    res.status(500).json({
        success: false,
        error: err
    })
}


module.exports = ErrorHandlerMiddleware