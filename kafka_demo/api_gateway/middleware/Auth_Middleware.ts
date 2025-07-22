import { Request, Response, NextFunction } from "express"

export const Auth_Middleware = (req: Request, res: Response, next: NextFunction) => {
    // Random uuid for demonstration purposes
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    req.headers.authorization = "Bearer " + uuid
    next()
}