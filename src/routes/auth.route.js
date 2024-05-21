import { Router } from "express";
import { register,login,logout,refresh_token } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router()

//Open Route
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/refresh_token').post(refresh_token)

//Auth Route
router.route('/logout').post(auth,logout)

export default router;