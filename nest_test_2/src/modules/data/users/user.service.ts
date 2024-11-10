import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/entities/user.entity";
import { AuthService } from "src/modules/users/user.service";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @Inject() private authService: AuthService) {}

    async getAllUsers() {
        return await this.userRepository.find({})
    }
}