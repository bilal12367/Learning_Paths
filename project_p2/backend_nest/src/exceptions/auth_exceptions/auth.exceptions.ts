import { HttpException, HttpStatus } from "@nestjs/common";



class UserNotFound extends HttpException {
    constructor(message: string = "User Not Found Exception!!") {
        super(message, HttpStatus.NOT_FOUND);
    }
}


class UserAlreadyExists extends HttpException {
    constructor(message: string = "User Already Exists Exception!!") {
        super(message, HttpStatus.BAD_GATEWAY);
    }
}


class PasswordMismatch extends HttpException {
    constructor(message: string = "Password Mismatch Exception!!") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export { UserNotFound , UserAlreadyExists, PasswordMismatch}