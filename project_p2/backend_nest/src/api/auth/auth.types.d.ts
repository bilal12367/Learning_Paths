
export interface IUserToken {
    email: string,
    token: string,
    isActive: boolean
}

export interface ForgetUserDto {
    email: string
}

export interface ISentEmailInfo {
    success: boolean,
    error: boolean,
    message: string,
    messageId: string,
    email: string
}