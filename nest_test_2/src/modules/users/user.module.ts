import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UtilService } from "src/utils/EncryptService";
import { UserService } from "./user.service";
import { User } from "../entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UtilService, UserService],
})



export class UserModule {

}