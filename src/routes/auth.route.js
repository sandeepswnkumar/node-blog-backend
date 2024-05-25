import { Router } from "express";
import { register,login,logout,refresh_token } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import CreateUserRequest from "../Requests/create_user_request.js";
import LoginRequest from "../Requests/login_request.js";
import RefreshTokenRequest from "../Requests/refresh_token_request.js";

const router = Router()

//Open Route
router.route('/register').post(CreateUserRequest,register)
router.route('/login').post(LoginRequest,login)
router.route('/refresh_token').post(RefreshTokenRequest,refresh_token)

//Auth Route
router.route('/logout').post(auth,logout)

export default router;