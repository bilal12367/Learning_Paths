import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddlware } from "src/common/middleware/auth.middleware";
import { UserDataController } from "./users/user.controller";
import { UserModule } from "../users/user.module";
import { UtilModule } from "src/utils/utils.module";
import { JwtService } from "src/utils/jwt.service";
import { UserService } from "./users/user.service";



@Module({
    controllers: [UserDataController],
    providers: [JwtService, UserService],
    exports: [DataModule],
    imports: [UserModule, UtilModule]
})

export class DataModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddlware)
            .exclude("auth")
            .forRoutes("api")
    }

}