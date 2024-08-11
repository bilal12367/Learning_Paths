import jwt, { SignOptions } from 'jsonwebtoken'

const generateToken = (userId: String): String => {
    const opts: SignOptions = {
        expiresIn: 1000 * 60 * 15,

    }
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET as string,opts)
}


export { generateToken }