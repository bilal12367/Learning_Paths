import { Body, Controller, Get, Inject, Post, UseFilters } from "@nestjs/common";
import { PasswordMismatch } from "src/common/exceptions/AuthorizationException.ts";
import { AuthorizationExceptionFilter } from "src/common/filters/AuthorizationExceptionFilter";
import { UserService } from "./user.service";



@Controller("/users")
export class UserController {
    constructor(@Inject() private userService: UserService) {}
    @Post()
    @UseFilters(AuthorizationExceptionFilter)
    registerUser(@Body() reqBody: IRegisterUser) {
        return this.userService.registerUser(reqBody);
    }

    @Post("/login")
    @UseFilters(AuthorizationExceptionFilter)
    loginUser(@Body() reqBody: ILoginUser) {
        return this.userService.loginUser(reqBody);
    }
}