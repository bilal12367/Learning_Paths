import { NextFunction, Request, Response } from "express";
import ConsoleLogger from "../config/logger/ConsoleLogger";
import FileLogger from "../config/logger/FileLogger";


const ResponseLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (body) {
        // Log the response body
        FileLogger.debug("Response: ", body);
        
        // Call the original res.send method with the response body
        return originalSend.call(this, body);
    };

    next();
}

export default ResponseLoggerMiddleware