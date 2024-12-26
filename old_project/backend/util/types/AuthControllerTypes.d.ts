import { IResponse } from "./AuthTypes"


interface RegisterRequest {
    fullName: String,
    email: String,
    password: String,
    mobileNo: String,
    age: number,
    role: String,
    userName: String
}
interface IRegisterResponse extends IResponse {
    body: {
        _id: String,
        userName: String,
        email: String,
        fullName: String,
        token: String
    }
}
interface ILoginResponse extends IResponse {
    body: {
        _id: String,
        userName: String,
        email: String,
        fullName: String,
        token: String
    }
}
