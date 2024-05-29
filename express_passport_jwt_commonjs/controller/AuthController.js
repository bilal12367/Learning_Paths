const logger = require("../logger/logger")
const AuthService = require("../service/AuthService")

const AuthController = {}

AuthController.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const role = "USER"
    // call service
    logger.debug("Called")
    const data = await AuthService.registerService(firstName, lastName, email, password);
    res.status(200).json({
        success: true,
        data: data
    })
}
AuthController.login = async (req, res) => {
    const { email, password } = req.body
    // call service
    const data = await AuthService.loginService(email, password);
    res.status(200).json({
        success: true,
        data
    })
}

module.exports = AuthController;
