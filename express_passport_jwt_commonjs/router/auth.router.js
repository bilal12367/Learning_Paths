

const { Router } = require("express");
const AuthController = require("../controller/AuthController");

const AuthRouter = Router()

AuthRouter.route("/register").post(AuthController.register)
AuthRouter.route("/login").post(AuthController.login)


module.exports = AuthRouter;