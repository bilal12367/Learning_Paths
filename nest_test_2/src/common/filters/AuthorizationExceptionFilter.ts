import { ArgumentsHost, Catch, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { AuthorizationException, PasswordMismatch, UserAlreadyExistsException, UserNotFound, WeakPassword } from "../exceptions/AuthorizationException.ts";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from 'express'
import { JsonWebTokenError } from "jsonwebtoken";

@Catch(AuthorizationException, JsonWebTokenError)
export class AuthorizationExceptionFilter extends BaseExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        console.log("Exception Caught: ",exception)
        const ctx: HttpArgumentsHost = host.switchToHttp()
        const res = ctx.getResponse<Response>()
        if (exception instanceof UserAlreadyExistsException) {
            res.status(HttpStatus.UNAUTHORIZED).json({ ...exception })
        } else if (exception instanceof UserNotFound) {
            res.status(HttpStatus.UNAUTHORIZED).json({ ...exception })
        } else if (exception instanceof PasswordMismatch) {
            res.status(HttpStatus.UNAUTHORIZED).json({ ...exception })
        } else if (exception instanceof WeakPassword) {
            res.status(HttpStatus.BAD_REQUEST).json({ ...exception })
        } else if (exception instanceof JsonWebTokenError) {
            res.status(HttpStatus.UNAUTHORIZED).json({...exception})
        }
    }
}