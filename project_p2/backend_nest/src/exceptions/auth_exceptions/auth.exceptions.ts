import { HttpException, HttpStatus } from "@nestjs/common";



class UserNotFoundException extends HttpException {
    constructor(message: string = "User Not Found!!") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

class EmailNotVerifiedException extends HttpException {
    constructor(message: string = "User Email Not Verified!!") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

class UserAlreadyExistsException extends HttpException {
    constructor(message: string = "User Already Exists!!") {
        super(message, HttpStatus.BAD_GATEWAY);
    }
}


class PasswordMismatchException extends HttpException {
    constructor(message: string = "Password Mismatch!!") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

class InvalidTokenException extends HttpException {
    constructor(message: string = "Invalid or Expired Token!!") {
        super(message, HttpStatus.UNAUTHORIZED)
    }
}

class TokenNotFoundException extends HttpException {
    constructor(message: string = 'Token Not Found!!') {
        super(message, HttpStatus.UNAUTHORIZED)
    }
}



export { TokenNotFoundException, UserNotFoundException , UserAlreadyExistsException, PasswordMismatchException, InvalidTokenException, EmailNotVerifiedException}