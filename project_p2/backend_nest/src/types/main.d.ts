
interface IResponseType {
    status: 'success' | 'error',
    data?: any,
    message?: string,
    error: boolean,
    success: boolean,
    timestamp?: Date
}
