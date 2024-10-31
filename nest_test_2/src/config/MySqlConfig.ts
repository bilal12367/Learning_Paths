import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/entities/user.entity";

const mysqlConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: '192.168.0.9',
    port: 3306,
    username: 'root',
    password: 'root_password',
    database: 'mydb',
    entities: [User],
    synchronize: true,
}

export default mysqlConfig