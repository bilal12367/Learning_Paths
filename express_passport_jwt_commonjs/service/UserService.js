const User = require("../schemas/User")


const UserService = {}


UserService.getAllUsers = async () => {
    return await User.find()
}

UserService.getByUserId = async (userId) => {
    return await User.findOne({ _id: userId })
}

module.exports = UserService