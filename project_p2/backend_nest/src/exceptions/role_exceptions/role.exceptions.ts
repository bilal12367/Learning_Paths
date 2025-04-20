import { HttpException, HttpStatus } from "@nestjs/common";



class InvalidRoleException extends HttpException {
    constructor(message: string = "Role Not Found!!") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export { InvalidRoleException }