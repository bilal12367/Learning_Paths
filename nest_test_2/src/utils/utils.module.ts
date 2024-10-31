import { Module } from "@nestjs/common";
import { UtilService } from "./EncryptService";

@Module({
    providers: [UtilService],
    exports: [UtilService]
})


export class UtilModule {

}