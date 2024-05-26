

class PasswordMismatchError extends Error {
    constructor() {
        super()
        this.message = "Password Not Matched !!"
        this.name = "PasswordMismatchException"
    }
}

export default PasswordMismatchError