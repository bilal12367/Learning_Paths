
export interface IUserToken {
    email: string,
    token: string,
    isActive: boolean
}

export interface ForgetUserDto {
    email: string
}