

class UserAlreadyExists extends Error {
    constructor(){
        super()
        this.message = "User Already Exists!!";
        this.name = "UserAlreadyExists"
    }
}

module.exports = UserAlreadyExists
