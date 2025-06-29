

export class ResponseBuilder<T> {
    private response: IResponseType

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

    build(): IResponseType {
        return this.response
    }

}