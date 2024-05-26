import { UserModel } from "../schema/User.js";

const controller = {}

controller.getUserById = (req, res) => {
    const { userId } = req.params;

    res.status(200).json({ success: true })
}

controller.getAllUsers = async (req, res) => {
    const user = req.user;
    console.log("User: ",user)
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users })
}

export const UserController = controller;