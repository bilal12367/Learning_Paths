import { NextFunction, Request, Response } from "express";
import ConsoleLogger from "../config/logger/ConsoleLogger";
import FileLogger from "../config/logger/FileLogger";


const ApiLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    FileLogger.debug(`Request: ${req.method} ${req.originalUrl}`)
    ConsoleLogger.debug(`Request: ${req.method} ${req.originalUrl}`)
    next(); // Proceed to the next middleware/route handler
}

export default ApiLoggerMiddleware