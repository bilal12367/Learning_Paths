

class UserNotExists extends Error {
    constructor(){
        super()
        this.message = "User Does not Exists!!";
        this.name = "UserNotExists"
    }
}

module.exports = UserNotExists
