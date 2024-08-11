const { HttpStatus } = require("http-status-ts")


interface User {
    _id?: String,
    userName: String,
    email: String,
    password: String,
    role: "USER" | "ADMIN",
    fullName: String,
    age: Number,
    phoneNumber: String
}

interface IUser extends User {}
interface RegisterUser extends User {
    
}

interface LoginUser { 
    email: String,
    password: String
}

export interface IResponse {
    success: boolean,
    error: boolean,
    code: typeof HttpStatus,
    body: any
}
export { User, RegisterUser, LoginUser, IUser}