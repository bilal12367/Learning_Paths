

export class ResponseBuilder<T> {
    private response: {
        status: 'success' | 'error',
        data?: T,
        message?: string,
        error: boolean,
        success: boolean,
        timestamp?: Date
    }

    constructor() {
        this.response = { status: 'error', success: false, error: true }
    }

    setStatus(status: 'success' | 'error') {
        this.response.status = status
        if(status == 'success') {
            this.response.success = true
            this.response.error = false
        } else {
            this.response.success = false
            this.response.error = true
        }
        return this
    }

    setData(data: T): this {
        this.response.data = data
        return this
    }

    setMessage(message: string): this {
        this.response.message = message
        return this
    }

    build(): this {
        return this
    }

}