import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthorizationException extends HttpException {
    constructor(message: String)  {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}


export class UserAlreadyExistsException extends AuthorizationException {
    constructor()  {
        super("User Already Exists !!");
    }
}


export class UserNotFound extends AuthorizationException {
    constructor()  {
        super("User Not Found!!");
    }
}

export class PasswordMismatch extends AuthorizationException {
    constructor()  {
        super("Password Mismatch!!");
    }
}

export class WeakPassword extends AuthorizationException {
    constructor() {
        super("Weak Password Exception!!")
    }
}