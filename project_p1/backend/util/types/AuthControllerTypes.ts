import { IResponse } from "./AuthTypes"


export interface RegisterRequest {
    fullName: String,
    email: String,
    password: String,
    mobileNo: String,
    age: number,
    role: String,
    userName: String
}
export interface IRegisterResponse extends IResponse {
    body: {
        _id: String,
        userName: String,
        email: String,
        fullName: String,
        token: String
    }
}
export interface ILoginResponse extends IResponse {
    body: {
        _id: String,
        userName: String,
        email: String,
        fullName: String,
        token: String
    }
}
