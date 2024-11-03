import { Inject, NestMiddleware, UnauthorizedException, UseFilters } from "@nestjs/common";
import { Request } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { AuthService } from "src/modules/users/user.service";
import { JwtService } from "src/utils/jwt.service";
import { AuthorizationException } from "../exceptions/AuthorizationException.ts";
import { AuthorizationExceptionFilter } from "../filters/AuthorizationExceptionFilter";

type ExtendedRequest = Request & { user: any }

export class AuthMiddlware implements NestMiddleware{
    constructor(@Inject() private jwtService: JwtService, @Inject() private authService: AuthService) {}

    async use(req: ExtendedRequest, res: any, next: (error?: Error | any) => void) {
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.includes('Bearer')) {
            const token = authHeader.split('Bearer')[1].trim()
            const payload = this.jwtService.verifyToken(token);
            const userId = payload._id;
            const user: IUser = await this.authService.getById(userId);
            req.user = user
            next()
        } else {
            throw new JsonWebTokenError("Invalid Token!!")
        }
    }

}