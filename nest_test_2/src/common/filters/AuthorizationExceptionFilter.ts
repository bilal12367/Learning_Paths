import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { AuthorizationException, PasswordMismatch, UserAlreadyExistsException, UserNotFound } from "../exceptions/AuthorizationException.ts";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from 'express'

@Catch(AuthorizationException)
export class AuthorizationExceptionFilter extends BaseExceptionFilter {
    catch(exception: AuthorizationException, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp()
        const res = ctx.getResponse<Response>()
        if (exception instanceof UserAlreadyExistsException) {
            res.status(HttpStatus.UNAUTHORIZED).json({ ...exception })
        } else if (exception instanceof UserNotFound) {
            res.status(HttpStatus.UNAUTHORIZED).json({ ...exception })
        } else if (exception instanceof PasswordMismatch) {
            res.status(HttpStatus.UNAUTHORIZED).json({ ...exception })
        }
    }
}