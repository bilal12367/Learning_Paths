const User = require("../schemas/User")
const UserAlreadyExists = require('../errors/UserAlreadyExists')
const UserNotExists = require('../errors/UserNotExists')
const jwt = require('jsonwebtoken')
const logger = require('../logger/logger')
const PasswordMismatch = require("../errors/PasswordMismatch")
const AuthService = {}

AuthService.registerService = async (firstName, lastName, email, password) => {

    if (await User.exists({ email })) {
        throw new UserAlreadyExists();
    }
    // logger.debug("USER: ", { firstName, lastName, email, password })
    const user = await User.create({
        firstName, lastName, email, password, role: "USER"
    })
    const token = user.createJwt();
    return { _id: user._id, firstName: user.firstName, email: user.email, token }
}

AuthService.loginService = async (email, password) => {
    if (!await User.exists({ email })) {
        throw new UserNotExists()
    }
    const user = await User.findOne({ email })
    if (!user.comparePassword(password)) {
        throw new PasswordMismatch()
    }

    const token = user.createJwt()

    return { _id: user._id, firstName: user.firstName, email: user.email, token }

}

module.exports = AuthService