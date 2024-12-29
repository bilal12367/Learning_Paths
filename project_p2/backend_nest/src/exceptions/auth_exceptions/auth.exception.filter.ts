import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException } from "@nestjs/common";
import { PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from "./auth.exceptions";



@Catch(UserNotFoundException, UserAlreadyExistsException, PasswordMismatchException)
class AuthExceptionFilter implements ExceptionFilter {


    catch(exception: any, host: ArgumentsHost) {
        
    }
    
}