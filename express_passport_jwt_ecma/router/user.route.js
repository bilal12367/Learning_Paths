import express from 'express'
import { UserController } from '../controller/user.controller.js';

const router = express.Router()


router.route("/user/:userId").get(UserController.getUserById)
router.route("/users/all").get(UserController.getAllUsers)

export const UserRouter = router;