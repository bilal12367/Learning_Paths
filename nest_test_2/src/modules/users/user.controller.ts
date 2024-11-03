import { Body, Controller, Get, Inject, Post, UseFilters } from "@nestjs/common";
import { PasswordMismatch } from "src/common/exceptions/AuthorizationException.ts";
import { AuthorizationExceptionFilter } from "src/common/filters/AuthorizationExceptionFilter";
import { AuthService } from "./user.service";



@Controller("/auth")
export class AuthController {
    constructor(@Inject() private userService: AuthService) {}
    @Post("/register")
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