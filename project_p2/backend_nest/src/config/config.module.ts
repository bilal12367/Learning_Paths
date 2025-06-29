import { Module } from "@nestjs/common";
import { TestLogger } from "./logger.config";
import { ConfigModule as CM } from "@nestjs/config";


@Module({
    imports: [
        CM.forRoot({
            isGlobal: true
        })
    ],
    providers: [TestLogger],
    exports: [TestLogger]
})

export class ConfigModule {}