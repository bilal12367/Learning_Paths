import mongoose from "mongoose"


const middleware = (err, req, res, next) => {
    console.log("Error Caught: ", err)
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(err.errors).map(err => err.message);
        res.status(500).json({
            success: false,
            error: errors
        })
    } else {
        res.status(500).json({
            success: false,
            error: err
        })

    }
}

export const ErrorHandlerMiddleware = middleware