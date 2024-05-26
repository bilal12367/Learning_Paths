import UserNotFoundError from "../errors/UserNotFoundException.js";
import { UserModel } from "../schema/User.js"
import PasswordMismatchError from '../errors/PasswordMismatchException.js'

const service = {}


service.RegisterService = async (firstName, lastName, email, password) => {
    let registeredUser = await UserModel.create({
        firstName, lastName, email, password, role: "USER"
    })
    const token = await registeredUser.createJwt();
    registeredUser = { ...registeredUser, _id: undefined, password: undefined, createdAt: undefined, updatedAt: undefined, role: undefined, token }
    return registeredUser;
}

service.loginService = async (email, password) => {
    if (!await UserModel.exists({ email: email })) {
        throw new UserNotFoundError()
    }
    let user = await UserModel.findOne({email})
    if(!user.comparePassword(password)){
        throw new PasswordMismatchError()
    }

    const token = await user.createJwt()
    user = {...user, _id: undefined, password: undefined, createdAt: undefined, updatedAt: undefined, role: undefined, token } 
    return user;
}

export const AuthService = service