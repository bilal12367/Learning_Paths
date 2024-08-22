import { ErrorRequestHandler } from "express";
import HttpStatus  from "http-status";
import { IResponse } from "../util/types/AuthTypes";



const ErrorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Error Caught:" , err);
    const resp: IResponse = {
        success: false,
        error: true,
        body: {
            message: "UnAuthorized Error",
            err
        },
        code: HttpStatus.INTERNAL_SERVER_ERROR

    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(resp)
}


export default ErrorHandlerMiddleware