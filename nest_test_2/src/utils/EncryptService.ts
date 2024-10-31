import { Injectable } from "@nestjs/common";
import {hash, compare , genSaltSync } from 'bcrypt'

@Injectable()
export class UtilService {
    constructor() { }

    async encryptPassword(password: string) {
        const salt = genSaltSync(10);
        const encryptPassword = await hash(password,salt)
        return encryptPassword
    }

    async comparePassword(password: string, hashPassword) {
        return await compare(password, hashPassword);
    }
}