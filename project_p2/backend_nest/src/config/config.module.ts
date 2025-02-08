import { Module } from "@nestjs/common";
import { TestLogger } from "./logger.config";


@Module({
    providers: [TestLogger],
    exports: [TestLogger]
})

export class ConfigModule {}