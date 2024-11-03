import { Controller, Get, Inject } from "@nestjs/common";
import { UserService } from "./user.service";



@Controller("api/users")
export class UserDataController {
    constructor(@Inject() private userService: UserService) {}
    @Get("/all")
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
}