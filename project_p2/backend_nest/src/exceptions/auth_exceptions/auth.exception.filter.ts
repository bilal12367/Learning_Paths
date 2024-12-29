import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException } from "@nestjs/common";
import { PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from "./auth.exceptions";



@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {


    catch(exception: any, host: ArgumentsHost) {
        console.log("Exception Caught!!", exception)
        const ctxt = host.switchToHttp()
        const res = ctxt.getResponse()


        res.status(400).json({ exception });

    }

}