import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @Inject() private userService: UserService) {}

    async getAllUsers() {
        return await this.userRepository.find({})
    }
}