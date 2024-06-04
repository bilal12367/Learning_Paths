import { Injectable } from '@nestjs/common';
import bcryptjs from 'bcryptjs'

@Injectable()
export class EncryptService {
    async encryptPassword(password: String): Promise<String> {
        const salt: string | number = await bcryptjs.genSalt(10); 
        const hashedPassword = await bcryptjs.hash(password as string, salt);
        return hashedPassword;
    }
    async isPasswordMatch(givenPassword: String, hashPassword: String): Promise<boolean> {
        return await bcryptjs.compare(givenPassword as string, hashPassword as string);
    }
}
