
const {Router} = require('express');
const UserController = require('../controller/UserController');

const UserRouter = Router()

UserRouter.route("/users/all").get(UserController.getAllUsers)

UserRouter.route("/user/:id").get(UserController.getUserById)


module.exports = UserRouter;
