import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { PasswordMismatch, UserAlreadyExistsException, UserNotFound } from "src/common/exceptions/AuthorizationException.ts";
import { UtilService } from "src/utils/EncryptService";



@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, @Inject() private utilService: UtilService) { }

    async registerUser(body: IRegisterUser) {
        if (await this.userRepository.exists({ where: { email: body.email } })) {
            throw new UserAlreadyExistsException()
        }
        const hashedPassword = await this.utilService.encryptPassword(body.password as string);

        const registeredUser = await this.userRepository.save({
            ...body,
            password: hashedPassword
        })

        return registeredUser;

    }

    async loginUser(body: ILoginUser) {
        if (!await this.userRepository.exists({ where: { email: body.email } })) {
            throw new UserNotFound();
        }
        const user = await this.userRepository.findOne({where: {email: body.email }})
        if( !await this.utilService.comparePassword(body.password as string, user.password) ) {
            throw new PasswordMismatch()
        }

        return user;
    }

    async getById(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (!user) {
            throw new UserNotFound()
        }
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.find({});
    }
}