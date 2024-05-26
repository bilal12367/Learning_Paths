import { AuthService } from "../service/AuthService.js"

const controller = {}
controller.register = async (req, res) => {
    const { firstName,lastName, email, password } = req.body
    const role = "USER"
    const resp = await AuthService.RegisterService(firstName,lastName,email,password)
    res.status(201).json({ success: true, data: resp })
}

controller.login = async (req, res) => {
    const { email, password } = req.body
    const resp = await AuthService.loginService(email, password);
    res.status(200).json({ success: true,data: resp })
}


export const AuthController = controller