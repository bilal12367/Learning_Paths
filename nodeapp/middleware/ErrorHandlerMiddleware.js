

const ErrorHandlerMiddleware = (err, req, res, next) => {
    console.log("Error Caught !!")
    console.log("===========================================================")
    console.log(err)
    console.log("===========================================================")
    res.status(500).json(err)
}

export { ErrorHandlerMiddleware }