import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException } from "@nestjs/common";
import { PasswordMismatch, UserAlreadyExists, UserNotFound } from "./auth.exceptions";


@Catch(UserNotFound, UserAlreadyExists, PasswordMismatch)
class AuthExceptionFilter implements ExceptionFilter {


    catch(exception: any, host: ArgumentsHost) {
        
    }
    
}