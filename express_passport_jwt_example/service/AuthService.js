import UserNotFoundError from "../errors/UserNotFoundException.js";
import { UserModel } from "../schema/User.js"
import PasswordMismatchError from '../errors/PasswordMismatchException.js'
import logger from "../utils/logger.js";

const service = {}


service.RegisterService = async (firstName, lastName, email, password) => {
    let registeredUser = await UserModel.create({
        firstName, lastName, email, password, role: "USER"
    })
    const token = await registeredUser.createJwt();
    registeredUser = {
        _id: registeredUser._id,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        role: undefined,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        token
    }
    logger.debug("Registered User: ", registeredUser);
    return registeredUser;
}

service.loginService = async (email, password) => {
    if (!await UserModel.exists({ email: email })) {
        throw new UserNotFoundError()
    }
    let user = await UserModel.findOne({ email })
    if (!user.comparePassword(password)) {
        throw new PasswordMismatchError()
    }

    const token = await user.createJwt()
    user = {
        _id: user._id,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        role: undefined,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
    }
    return user;
}

export const AuthService = service