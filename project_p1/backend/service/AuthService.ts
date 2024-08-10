import { Model } from "mongoose";
import { LoginUser, RegisterUser, User } from "../constants/types/AuthTypes";
import UserRepository from "../schema/UserRepository";
import { NextFunction, RequestHandler } from "express";

interface IAuthService {
    registerUserService: (user: User) => Promise<User>,
    loginUserService: (user: User) => Promise<User>
}

const AuthService: IAuthService = {
    registerUserService: async (user) => {
        if (!await UserRepository.exists({ email: user.email })) {
            const registeredUser: User = await UserRepository.create(user);
            return registeredUser;
        } else {
            throw new Error("User Already Exists!")
        }
    },
    loginUserService: async (user) => {
        if (await UserRepository.exists({ email: user.email })) {
            // compare passwords
            return await UserRepository.findOne({ email: user.email }) as User
        } else {
            throw new Error("User Doesn't Exists!!");
        }
    }
}

export default AuthService