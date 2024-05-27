import express from 'express'
import { AuthController } from '../controller/AuthController.js'
const router = express.Router()

router.route("/register").post(AuthController.register);
router.route("/login").post(AuthController.login);

export const AuthRouter = router