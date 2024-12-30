import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException } from "@nestjs/common";
import { PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from "./auth.exceptions";



@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {


    catch(ex: any, host: ArgumentsHost) {
        const ctxt = host.switchToHttp()
        const res = ctxt.getResponse()

        console.log(ex)
        res.status(ex.status).json({ success: false, message: ex.message });

    }

}