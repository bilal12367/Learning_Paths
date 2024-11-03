import { Module } from "@nestjs/common";
import { EncryptionService } from "./EncryptService";
import { JwtService } from "./jwt.service";

@Module({
    providers: [JwtService, EncryptionService],
    exports: [EncryptionService, JwtService]
})


export class UtilModule {

}