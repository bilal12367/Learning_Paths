
import { Router, RouterOptions } from "express";
import { ROUTE_URL } from "../constants/App_Route_URL";
import AuthController from "../controllers/AuthController";

const router: Router = Router();


router.post("/register",AuthController.registerUser)
router.post("/login",AuthController.loginUser)


export default router;