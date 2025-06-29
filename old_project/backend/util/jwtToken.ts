import jwt, { SignOptions } from 'jsonwebtoken'

const generateToken = (userId: String): String => {
    const opts: SignOptions = {
        expiresIn: 60 * 60 * 24 * 365,

    }
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET as string,opts)
}


export { generateToken }