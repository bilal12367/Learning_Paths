import { Module } from "@nestjs/common";
import { AuthController } from "./user.controller";
import { AuthService } from "./user.service";
import { User } from "../entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EncryptionService } from "src/utils/EncryptService";
import { JwtService } from "src/utils/jwt.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [AuthService],
    controllers: [AuthController],
    providers: [EncryptionService, JwtService, AuthService],
})



export class UserModule {

}