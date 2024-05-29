

class PasswordMismatch extends Error {
    constructor(){
        super()
        this.message = "Password Mismatch!!";
        this.name = "PasswordMismatch"
    }
}

module.exports = PasswordMismatch
