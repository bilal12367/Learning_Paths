import { NextFunction, Request, Response, RequestHandler } from 'express'
import AuthService from '../service/AuthService'
import { RegisterUser, IResponse, User } from '../util/types/AuthTypes'
import HttpStatus from 'http-status'
import { ILoginResponse, IRegisterResponse } from '../util/types/AuthControllerTypes'
import { generateToken } from '../util/jwtToken'

interface IAuthController {
    registerUser: RequestHandler,
    loginUser: RequestHandler
}



const AuthController: IAuthController = {
    registerUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const requestUser = req.body as User
        requestUser.phoneNumber = req.body.mobileNo as String
        const registeredUser: User = await AuthService.registerUserService(requestUser);
        const resp: IRegisterResponse = {
            success: true,
            error: false,
            code: HttpStatus.CREATED,
            body: {
                _id: registeredUser._id as String,
                email: registeredUser.email,
                fullName: registeredUser.fullName,
                userName: registeredUser.userName,
                token: generateToken(registeredUser._id as String)
            }
        }
        res.status(HttpStatus.CREATED).json(resp)
    },
    loginUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const loginUser = req.body as User;
        loginUser.phoneNumber = req.body.mobileNo
        const user = await AuthService.loginUserService(loginUser);
        const resp : ILoginResponse = {
            success: true,
            error: true,
            code: HttpStatus.ACCEPTED,
            body: {
                _id: user._id as String,
                email: user.email,
                fullName: user.fullName,
                userName: user.userName,
                token: generateToken(user._id as String)
            }
        }
        res.status(HttpStatus.ACCEPTED).json(resp)
    }
}

export default AuthController