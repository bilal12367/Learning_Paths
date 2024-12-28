import { Injectable } from '@nestjs/common';
import jwt, { Jwt } from 'jsonwebtoken'
import fs from 'fs'

interface JwtPayload {
    id: string
}

@Injectable()
export class JwtService {
    private privateKeyFilePath: string;
    constructor() {
        this.privateKeyFilePath =  '../config/keys/private.key';
    }

    getPrivateKey(): Buffer {
        return fs.readFileSync(this.privateKeyFilePath)
    }

    generateToken(jwtPayload: JwtPayload) {
        const token = jwt.sign(jwtPayload, this.getPrivateKey(), { algorithm: 'RS256', expiresIn: "30 days" })
        return token
    }

    verifyToken(token: string): JwtPayload {
        const payload: JwtPayload = jwt.verify(token, this.getPrivateKey(), { algorithms: ['RS256'] }) as JwtPayload
        return payload;
    }
}
