import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { EmailNotVerifiedException, InvalidTokenException, PasswordMismatchException, UserAlreadyExistsException, UserNotFoundException } from "./auth.exceptions";



@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {


    catch(ex: any, host: ArgumentsHost) {
        const ctxt = host.switchToHttp()
        const res = ctxt.getResponse()

        console.log(ex)

        if(ex instanceof InvalidTokenException) {
            res.status(HttpStatus.UNAUTHORIZED).json({success: false, message: 'Expired Token!'})
        } else if(ex instanceof EmailNotVerifiedException) {
            res.status(HttpStatus.UNAUTHORIZED).json({success: false, message: ex.message})
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: ex.message });
        }


    }

}