
import { Router, RouterOptions } from "express";
import { ROUTE_URL } from "../constants/App_Route_URL";
import AuthController from "../controllers/AuthController";

const router: Router = Router();


router.post("/register",AuthController.registerUser)
router.post("/login",AuthController.loginUser)
router.post("/refreshToken", AuthController.refreshToken)

export default router;