const logger = require("../logger/logger");
const UserService = require("../service/UserService")


const UserController = {}


UserController.getAllUsers = async (req, res) => {
    // call service
    const users = await UserService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users
    })
}
UserController.getUserById = async (req, res) => {
    const { id } = req.params
    // call service
    const user = await UserService.getByUserId(id);
    res.status(200).json({
        success: true,
        data: user
    })
}

module.exports = UserController;