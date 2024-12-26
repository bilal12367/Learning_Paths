import { Response } from "express"
import { TokenInvalid } from "../util/errors/TokenInvalid"

const AuthErrorHandler = (err: any, req: any, res: Response, next: any) => {
    console.log("err: ",err)
    if (err) {
        res.redirect("auth/refreshToken")
    }else {
        next()
    }
}

export default AuthErrorHandler