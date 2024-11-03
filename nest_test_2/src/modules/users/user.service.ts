import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { PasswordMismatch, UserAlreadyExistsException, UserNotFound, WeakPassword } from "src/common/exceptions/AuthorizationException.ts";
import { EncryptionService } from "src/utils/EncryptService";
import validator from "validator";
import { JwtService } from "src/utils/jwt.service";


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, @Inject() private encryptionService: EncryptionService, @Inject() private jwtService: JwtService) { }

    async registerUser(body: IRegisterUser) {
        if (await this.userRepository.exists({ where: { email: body.email } })) {
            throw new UserAlreadyExistsException()
        }

        if (!validator.isStrongPassword(body.password as string)) {
            throw new WeakPassword()
        }
        console.log("Triggered")
        const hashedPassword = await this.encryptionService.encryptPassword(body.password as string);
        const registeredUser: any = await this.userRepository.save({
            ...body,
            password: hashedPassword
        })
        const token = this.jwtService.generateToken({ _id: registeredUser.id as string })
        registeredUser.token = token;
        return registeredUser;

    }

    async loginUser(body: ILoginUser) {
        if (!await this.userRepository.exists({ where: { email: body.email } })) {
            throw new UserNotFound();
        }
        const user: any= await this.userRepository.findOne({ where: { email: body.email } })
        if (!await this.encryptionService.comparePassword(body.password as string, user.password)) {
            throw new PasswordMismatch()
        }
        const token = this.jwtService.generateToken({ _id: user.id as string})
        user.token = token;
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