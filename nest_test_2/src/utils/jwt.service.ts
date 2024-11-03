import { Injectable } from "@nestjs/common";
import jwt from 'jsonwebtoken'

interface payload { _id: string }

@Injectable()
export class JwtService {
    private key = "123345436235324";
    generateToken(body: { _id: string }) {
        const token = jwt.sign(body, this.key, {})
        return token
    }

    verifyToken(token: string) {
        const body: payload = jwt.verify(token, this.key) as payload
        return body;
    }
}