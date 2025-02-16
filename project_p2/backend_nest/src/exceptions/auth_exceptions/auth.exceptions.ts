import { HttpException, HttpStatus } from "@nestjs/common";



class UserNotFoundException extends HttpException {
    constructor(message: string = "User Not Found Exception!!") {
        super(message, HttpStatus.NOT_FOUND);
    }
}


class UserAlreadyExistsException extends HttpException {
    constructor(message: string = "User Already Exists Exception!!") {
        super(message, HttpStatus.BAD_GATEWAY);
    }
}


class PasswordMismatchException extends HttpException {
    constructor(message: string = "Password Mismatch Exception!!") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

class InvalidTokenException extends HttpException {
    constructor(message: string = "Invalid or Expired Token!!") {
        super(message, HttpStatus.UNAUTHORIZED)
    }
}



export { UserNotFoundException , UserAlreadyExistsException, PasswordMismatchException, InvalidTokenException}