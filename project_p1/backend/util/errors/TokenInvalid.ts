

export class TokenInvalid extends Error {
    constructor() {
        super()
        super.message = "Token Missing or Expired From Request!!"
    }
}