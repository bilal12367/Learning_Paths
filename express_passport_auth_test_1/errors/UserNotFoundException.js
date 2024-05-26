

class UserNotFoundError extends Error {
    constructor() {
        super()
        this.message = "User Not Found !!"
        this.name = "UserNotFoundError"
    }
}

export default UserNotFoundError